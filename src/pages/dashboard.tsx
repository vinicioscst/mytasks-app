import { Button, Divider } from '@heroui/react'
import Container from '../components/container'
import Nav from '../components/nav'
import { Plus } from 'lucide-react'
import TasksList from '../components/tasks-list'

export type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  isCompleted: boolean
}

export let tasks: Task[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    title: 'Comprar mantimentos',
    description: 'Ir ao supermercado e comprar frutas, legumes, pão e leite.',
    dueDate: '2025-06-26',
    isCompleted: false
  },
  {
    id: 'f9e8d7c6-b5a4-3210-fedc-ba9876543210',
    title: 'Pagar contas',
    description: 'Pagar a conta de luz, água e internet antes do vencimento.',
    dueDate: '2025-06-28',
    isCompleted: false
  },
  {
    id: '1a2b3c4d-5e6f-7890-abcd-ef0123456789',
    title: 'Agendar reunião',
    description:
      'Entrar em contato com a equipe para agendar a reunião semanal.',
    dueDate: '2025-06-27',
    isCompleted: true
  },
  {
    id: '0fedcb-a987-6543-210f-edcba9876543',
    title: 'Fazer exercício',
    description: 'Caminhar por 30 minutos ou ir à academia.',
    dueDate: '2025-06-26',
    isCompleted: false
  },
  {
    id: '98765432-10fe-dcba-9876-543210fedcba',
    title: 'Ler livro',
    description: "Ler o capítulo 5 do livro 'A Arte da Guerra'.",
    dueDate: '2025-07-01',
    isCompleted: false
  }
]

const toDoTasks = tasks.filter((task) => !task.isCompleted)
const doneTasks = tasks.filter((task) => task.isCompleted)

function Dashboard() {
  return (
    <>
      <Nav />
      <main className='mt-20'>
        <Container>
          <div className='bg-white border border-neutral-200 rounded-lg shadow-lg p-7'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold'>Minhas tarefas</h2>
              <Button
                variant='flat'
                startContent={<Plus />}
              >
                Adicionar tarefa
              </Button>
            </div>
            <Divider className='my-6' />
            <TasksList
              tasks={toDoTasks}
              type='to-do'
            />
            <Divider className='my-6' />
            <TasksList
              tasks={doneTasks}
              type='done'
            />
          </div>
        </Container>
      </main>
    </>
  )
}

export default Dashboard
