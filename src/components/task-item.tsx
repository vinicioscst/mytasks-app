import type { Task } from '../store/authStore'
import { formatDate } from '../utils/actions/format-date'
import ViewTaskModal from './view-task-modal'
import DeleteTaskModal from './delete-task-modal'
import CreateOrUpdateTaskModal from './create-or-update-task-modal'
import TaskCheckbox from './task-checkbox'
import { isTaskOverdue } from '../utils/actions/is-task-overdue'
import { getDaysUntilDeadline } from '../utils/actions/get-days-until-deadline'
import { Chip } from '@heroui/react'
import { Calendar } from 'lucide-react'

interface TaskItemProps {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
  const formattedTaskDate = formatDate(task.dueDate)
  const isOverdue = isTaskOverdue(task.dueDate, task.isCompleted)
  const daysUntilDeadline = getDaysUntilDeadline(task.dueDate)

  return (
    <li>
      <div className='space-y-3 sm:space-y-0 sm:flex sm:items-center sm:space-x-6'>
        <div className='flex flex-col items-start space-x-3 sm:space-x-4 flex-1 min-w-0'>
          <TaskCheckbox
            isSelected={task.isCompleted}
            taskTitle={task.title}
            taskId={task.id}
          />
          <p className='pl-7 text-sm text-neutral-500 line-clamp-2 sm:line-clamp-1'>
            {task.description}
          </p>
        </div>

        <div className='hidden sm:flex sm:items-center sm:space-x-2 sm:flex-shrink-0'>
          <div className='flex items-center gap-1'>
            <Calendar
              size={12}
              className='stroke-neutral-600'
            />
            <p className='text-sm text-neutral-600'>{formattedTaskDate}</p>
          </div>

          {task.isCompleted && (
            <Chip
              size='sm'
              variant='flat'
              className='bg-violet-400 text-violet-100'
            >
              Completo
            </Chip>
          )}

          {isOverdue && (
            <Chip
              size='sm'
              variant='flat'
              className='bg-red-400 text-red-100'
            >
              Atrasado
            </Chip>
          )}

          {!isOverdue && !task.isCompleted && (
            <Chip
              size='sm'
              variant='flat'
              className='bg-slate-400 text-slate-100'
            >
              {daysUntilDeadline}
            </Chip>
          )}
        </div>

        <div className='flex items-center sm:justify-end space-x-1 sm:flex-shrink-0 pl-7 sm:pl-0'>
          <ViewTaskModal task={task} />
          <CreateOrUpdateTaskModal
            mode='update'
            task={task}
          />
          <DeleteTaskModal
            taskId={task.id}
            taskTitle={task.title}
          />
        </div>
      </div>
    </li>
  )
}

export default TaskItem
