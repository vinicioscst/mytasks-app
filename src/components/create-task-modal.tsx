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
import { LoaderCircle, Plus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import {
  createTaskSchema,
  type TCreateTaskSchema
} from '../utils/schemas/tasks/create-task'
import { tasksStore } from '../store/tasksStore'
import { getLocalTimeZone, today } from '@internationalized/date'
import { I18nProvider } from '@react-aria/i18n'

function CreateTaskModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { createTask, isLoading } = tasksStore((state) => state)

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: null,
      isCompleted: false
    }
  })

  async function handleCreate(formData: TCreateTaskSchema) {
    await createTask(formData)
    reset()
    onClose()
  }

  return (
    <>
      <Button
        variant='flat'
        startContent={<Plus />}
        onPress={onOpen}
      >
        Adicionar tarefa
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='lg'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Criar tarefa</ModalHeader>
              <ModalBody>
                <Form
                  className='space-y-1'
                  onSubmit={handleSubmit(handleCreate)}
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
                  ) : (
                    'Criar'
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

export default CreateTaskModal
