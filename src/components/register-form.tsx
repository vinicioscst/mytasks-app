import { Button, Form, Input } from '@heroui/react'

function RegisterForm() {
  return (
    <Form className='space-y-1'>
      <Input
        label='Nome'
        type='text'
        variant='bordered'
      />
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
        Cadastrar
      </Button>
    </Form>
  )
}

export default RegisterForm
