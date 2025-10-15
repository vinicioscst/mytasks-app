/** biome-ignore-all lint/correctness/useUniqueElementIds: Static id not set only for functional purpose */
/** biome-ignore-all lint/style/noNonNullAssertion: Function can only be called if user exists */
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { userStore } from '../store/userStore'
import { formatUpdateUserBody } from '../utils/actions/format-update-user-body'
import {
  type TUpdateUserSchema,
  updateUserSchema
} from '../utils/schemas/user/update-user'

interface UpdateUserModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function UpdateUserModal({ isOpen, setIsOpen }: UpdateUserModalProps) {
  const [modalType, setModalType] = useState<'update-user' | 'delete-user'>(
    'update-user'
  )

  function handleClose() {
    setIsOpen(false)
    setModalType('update-user')
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      size='lg'
      placement='center'
    >
      <ModalContent>
        {modalType === 'update-user' && (
          <UpdateUserContent
            onClose={handleClose}
            setModalType={setModalType}
          />
        )}
        {modalType === 'delete-user' && (
          <DeleteUserContent onClose={handleClose} />
        )}
      </ModalContent>
    </Modal>
  )
}

function UpdateUserContent({
  onClose,
  setModalType
}: {
  onClose: () => void
  setModalType: React.Dispatch<
    React.SetStateAction<'update-user' | 'delete-user'>
  >
}) {
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
          color='danger'
          variant='flat'
          onPress={() => setModalType('delete-user')}
          fullWidth
        >
          Excluir usuário
        </Button>
        <Button
          className='bg-violet-500 disabled:bg-violet-900 text-violet-100 disabled:text-violet-500'
          color='default'
          variant='flat'
          form='update-user-form'
          type='submit'
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? <LoaderCircle className='animate-spin' /> : 'Atualizar'}
        </Button>
      </ModalFooter>
    </>
  )
}

function DeleteUserContent({ onClose }: { onClose: () => void }) {
  const { isLoading, user, deleteUser } = userStore((state) => state)
  const navigate = useNavigate()

  async function handleDeleteUser() {
    await deleteUser(user!.id)
    navigate('/')
  }

  return (
    <>
      <ModalHeader>
        <p>Deseja excluir usuário?</p>
      </ModalHeader>
      <ModalBody className='gap-0'>
        <p>Essa ação não poderá ser desfeita.</p>
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
          color='danger'
          variant='flat'
          disabled={isLoading}
          onPress={handleDeleteUser}
          fullWidth
        >
          {isLoading ? <LoaderCircle className='animate-spin' /> : 'Excluir'}
        </Button>
      </ModalFooter>
    </>
  )
}

export default UpdateUserModal
