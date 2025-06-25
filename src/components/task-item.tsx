import { Checkbox } from '@heroui/react'
import { Eye, PenLine, Trash2 } from 'lucide-react'
import type { Task } from '../data/tasks'

interface TaskItemProps {
  task: Task
  type: 'to-do' | 'done'
}

function TaskItem({ task, type }: TaskItemProps) {
  const taskDate = new Date(task.dueDate)
  const formattedTaskDate = new Intl.DateTimeFormat('pt-BR').format(taskDate)

  if (type === 'to-do')
    return (
      <li key={task.id}>
        <div className='flex items-center justify-between'>
          <div>
            <Checkbox>{task.title}</Checkbox>
            <p className='text-sm text-neutral-600'>
              Finalizar até {formattedTaskDate}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <Eye className='fill-green-100 stroke-green-500' />
              <PenLine className='fill-blue-100 stroke-blue-500' />
              <Trash2 className='fill-red-100 stroke-red-500' />
            </div>
          </div>
        </div>
      </li>
    )

  if (type === 'done') {
    return (
      <li key={task.id}>
        <div className='flex items-center justify-between gap-4'>
          <Checkbox
            defaultSelected
            lineThrough
            color='success'
          >
            {task.title}
          </Checkbox>
        </div>
      </li>
    )
  }
}

export default TaskItem
