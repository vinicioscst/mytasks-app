import { Form } from '@heroui/form'
import { Button, Input } from '@heroui/react'

function LoginForm() {
  return (
    <Form className='space-y-1'>
      <Input
        label='Email'
        type='email'
        variant='bordered'
      />
      <Input
        label='Senha'
        type='text'
        variant='bordered'
      />
      <Button
        className='bg-neutral-900 text-neutral-100 font-bold'
        fullWidth
      >
        Entrar
      </Button>
    </Form>
  )
}

export default LoginForm
