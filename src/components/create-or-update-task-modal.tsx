import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus, SquarePen } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import {
  createTaskSchema,
  type TCreateTaskSchema
} from '../utils/schemas/tasks/create-task'
import { tasksStore } from '../store/tasksStore'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { I18nProvider } from '@react-aria/i18n'
import type { Task } from '../store/authStore'
import {
  updateTaskSchema,
  type TUpdateTaskSchema
} from '../utils/schemas/tasks/update-task'

interface ICreateTaskModalProps {
  mode: 'create'
  task?: Task
}

interface IUpdateTaskModalProps {
  mode: 'update'
  task: Task
}

type ICreateOrUpdateTaskModalProps =
  | ICreateTaskModalProps
  | IUpdateTaskModalProps

function CreateOrUpdateTaskModal({
  task,
  mode
}: ICreateOrUpdateTaskModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { createTask, updateTask, isLoading } = tasksStore((state) => state)

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(
      mode === 'create' ? createTaskSchema : updateTaskSchema
    ),
    defaultValues: {
      title: mode === 'create' ? '' : task.title,
      description: mode === 'create' ? '' : task.description,
      dueDate:
        mode === 'create'
          ? null
          : new CalendarDate(
              new Date(task.dueDate).getFullYear(),
              new Date(task.dueDate).getMonth() + 1,
              new Date(task.dueDate).getDate()
            ),
      isCompleted: mode === 'create' ? false : task.isCompleted
    }
  })

  async function handleFormAction(
    formData: TCreateTaskSchema | TUpdateTaskSchema
  ) {
    if (mode === 'create') {
      await createTask(formData as TCreateTaskSchema)
      reset()
      onClose()
    }

    if (mode === 'update') {
      await updateTask(formData as TUpdateTaskSchema, task.id)
      onClose()
    }
  }

  return (
    <>
      {mode === 'create' ? (
        <Button
          variant='flat'
          startContent={
            <Plus
              size={16}
              className='hidden xs:block'
            />
          }
          onPress={onOpen}
        >
          Adicionar tarefa
        </Button>
      ) : (
        <Button
          className='min-w-fit'
          size='sm'
          variant='flat'
          onPress={onOpen}
        >
          <SquarePen
            size={14}
            className='stroke-neutral-600'
          />
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='lg'
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {mode === 'create' ? 'Criar tarefa' : 'Atualizar tarefa'}
              </ModalHeader>
              <ModalBody>
                <Form
                  className='space-y-1'
                  onSubmit={handleSubmit(handleFormAction)}
                  id='create-task-form'
                >
                  <Controller
                    control={control}
                    name='title'
                    render={({
                      field: { name, value, onChange, onBlur, ref },
                      fieldState: { invalid, error }
                    }) => (
                      <Input
                        label='Título'
                        type='text'
                        variant='bordered'
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        ref={ref}
                        errorMessage={error?.message}
                        validationBehavior='aria'
                        isInvalid={invalid}
                        isRequired
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='description'
                    render={({
                      field: { name, value, onChange, onBlur, ref },
                      fieldState: { invalid, error }
                    }) => (
                      <Textarea
                        label='Descrição'
                        variant='bordered'
                        name={name}
                        value={value || undefined}
                        onBlur={onBlur}
                        onChange={onChange}
                        ref={ref}
                        errorMessage={error?.message}
                        validationBehavior='aria'
                        isInvalid={invalid}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='dueDate'
                    render={({
                      field: { name, value, onChange, onBlur, ref },
                      fieldState: { invalid, error }
                    }) => (
                      <I18nProvider locale='pt-BR'>
                        <DatePicker
                          label='Vencimento'
                          variant='bordered'
                          name={name}
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          ref={ref}
                          errorMessage={error?.message}
                          validationBehavior='aria'
                          isInvalid={invalid}
                          minValue={today(getLocalTimeZone())}
                          showMonthAndYearPickers
                          isRequired
                        />
                      </I18nProvider>
                    )}
                  />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant='flat'
                  onPress={onClose}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button
                  className='bg-violet-500 disabled:bg-violet-900 text-violet-100 disabled:text-violet-500'
                  type='submit'
                  form='create-task-form'
                  disabled={isLoading}
                  fullWidth
                >
                  {isLoading ? (
                    <LoaderCircle className='animate-spin' />
                  ) : mode === 'create' ? (
                    'Criar'
                  ) : (
                    'Atualizar'
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateOrUpdateTaskModal
