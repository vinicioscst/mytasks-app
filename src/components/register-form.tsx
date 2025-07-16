import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  createUserSchema,
  type TCreateUserSchema
} from '../utils/schemas/user/create-user'
import { authStore } from '../store/authStore'

function RegisterForm() {
  const { isLoading, register } = authStore((state) => state)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  async function handleRegister(formData: TCreateUserSchema) {
    await register(formData)
    reset()
  }

  return (
    <Form
      className='space-y-1'
      onSubmit={handleSubmit(handleRegister)}
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
            isRequired
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
            isRequired
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
                className='focus:outline-none'
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

      <Button
        className='bg-neutral-900 disabled:bg-neutral-700 text-neutral-100 font-bold'
        type='submit'
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <LoaderCircle className='animate-spin' /> : 'Cadastrar'}
      </Button>
    </Form>
  )
}

export default RegisterForm
