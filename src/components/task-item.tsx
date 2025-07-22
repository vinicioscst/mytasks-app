import { Checkbox } from '@heroui/react'
import { PenLine } from 'lucide-react'
import type { Task } from '../store/authStore'
import { formatDate } from '../utils/actions/format-date'
import ViewTaskModal from './view-task-modal'
import DeleteTaskModal from './delete-task-modal'

interface TaskItemProps {
  task: Task
  type: 'to-do' | 'completed'
}

function TaskItem({ task, type }: TaskItemProps) {
  const formattedTaskDate = formatDate(task.dueDate)

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
              <ViewTaskModal task={task} />
              <PenLine className='fill-blue-100 stroke-blue-500' />
              <DeleteTaskModal
                taskId={task.id}
                taskTitle={task.title}
              />
            </div>
          </div>
        </div>
      </li>
    )

  if (type === 'completed') {
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
