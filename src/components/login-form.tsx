import { Form } from '@heroui/form'
import { Button, Input } from '@heroui/react'
import { authStore } from '../store/authStore'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type TLoginSchema } from '../utils/schemas/user/login'
import { LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router'

function LoginForm() {
  const { isLoading, login } = authStore((state) => state)
  const navigate = useNavigate()

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleLogin(formData: TLoginSchema) {
    await login(formData)
    reset()
    navigate('/dashboard')
  }

  return (
    <Form
      className='space-y-1'
      onSubmit={handleSubmit(handleLogin)}
    >
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
            type='password'
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

      <Button
        className='bg-neutral-900 disabled:bg-neutral-700 text-neutral-100 font-bold'
        type='submit'
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <LoaderCircle className='animate-spin' /> : 'Entrar'}
      </Button>
    </Form>
  )
}

export default LoginForm
