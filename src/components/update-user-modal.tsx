import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@heroui/react'
import { userStore } from '../store/userStore'
import {
  updateUserSchema,
  type TUpdateUserSchema
} from '../utils/schemas/user/update-user'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { formatUpdateUserBody } from '../utils/actions/format-update-user-body'

interface UpdateUserModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}

function UpdateUserModal({
  isOpen,
  onOpenChange,
  onClose
}: UpdateUserModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const { isLoading, user, updateUser } = userStore((state) => state)

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: undefined
    }
  })

  async function handleUpdate(data: TUpdateUserSchema) {
    const formattedData = formatUpdateUserBody(user!, data)
    await updateUser(formattedData, user!.id)
    onClose()
  }

  return (
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
              <p>Editar usuário</p>
            </ModalHeader>
            <ModalBody className='gap-0'>
              <Form
                className='space-y-1'
                id='update-user-form'
                onSubmit={handleSubmit(handleUpdate)}
              >
                <Controller
                  control={control}
                  name='name'
                  render={({
                    field: { name, value, onChange, onBlur, ref },
                    fieldState: { invalid, error }
                  }) => (
                    <Input
                      label='Nome'
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
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='email'
                  render={({
                    field: { name, value, onChange, onBlur, ref },
                    fieldState: { invalid, error }
                  }) => (
                    <Input
                      label='Email'
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
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='password'
                  render={({
                    field: { name, value, onChange, onBlur, ref },
                    fieldState: { invalid, error }
                  }) => (
                    <Input
                      label='Senha'
                      type={isVisible ? 'text' : 'password'}
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
                      endContent={
                        <button
                          aria-label='toggle password visibility'
                          className='focus:outline-none pb-1.5'
                          type='button'
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeClosed className='text-default-400 pointer-events-none' />
                          ) : (
                            <Eye className='text-default-400 pointer-events-none' />
                          )}
                        </button>
                      }
                    />
                  )}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color='default'
                variant='flat'
                onPress={onClose}
                fullWidth
              >
                Cancelar
              </Button>
              <Button
                className='bg-violet-500 disabled:bg-violet-900 text-violet-100 disabled:text-violet-500'
                color='danger'
                variant='flat'
                form='update-user-form'
                type='submit'
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  'Atualizar'
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UpdateUserModal
