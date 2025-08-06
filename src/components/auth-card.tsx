import { Card, CardHeader, CardBody } from '@heroui/card'
import { Tabs, Tab } from '@heroui/tabs'
import LoginForm from './login-form'
import RegisterForm from './register-form'
import { useState } from 'react'

function AuthCard() {
  const [selected, useSelected] = useState<string | number>('login')

  return (
    <Card className='py-4'>
      <CardHeader>
        <div className='w-full space-y-1 text-center'>
          <h2 className='text-lg sx:text-2xl font-bold'>
            Bem-vindo ao My Tasks
          </h2>
          <p className='text-sm sx:text-base'>
            Entre na sua conta ou crie uma nova para começar
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <Tabs
          aria-label='Formulários'
          selectedKey={selected}
          onSelectionChange={useSelected}
          fullWidth
        >
          <Tab
            key='login'
            title='Login'
          >
            <LoginForm />
          </Tab>
          <Tab
            key='register'
            title='Cadastro'
          >
            <RegisterForm />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  )
}

export default AuthCard
