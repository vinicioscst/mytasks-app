import { Button, Divider } from '@heroui/react'
import Container from '../components/container'
import Nav from '../components/nav'
import { BrushCleaning, Plus } from 'lucide-react'
import TasksList from '../components/tasks-list'
import { tasks } from '../data/tasks'

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
              <h2 className='text-xl font-bold'>Lista de tarefas</h2>
              <Button
                variant='flat'
                startContent={<Plus />}
              >
                Adicionar tarefa
              </Button>
            </div>
            <Divider className='my-6' />
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>A fazer</h3>
              <TasksList
                tasks={toDoTasks}
                type='to-do'
              />
            </div>
            <Divider className='my-6' />
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Feitas</h3>
                <Button
                  size='sm'
                  variant='bordered'
                  startContent={<BrushCleaning size={16} />}
                >
                  Limpar
                </Button>
              </div>
              <TasksList
                tasks={doneTasks}
                type='done'
              />
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Dashboard
