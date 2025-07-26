import type { Task } from '../store/authStore'
import { formatDate } from '../utils/actions/format-date'
import ViewTaskModal from './view-task-modal'
import DeleteTaskModal from './delete-task-modal'
import CreateOrUpdateTaskModal from './create-or-update-task-modal'
import TaskCheckbox from './task-checkbox'

interface TaskItemProps {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
  const formattedTaskDate = formatDate(task.dueDate)

  return (
    <li>
      <div className='flex items-center justify-between'>
        <div>
          <TaskCheckbox
            isSelected={task.isCompleted}
            taskTitle={task.title}
            taskId={task.id}
          />
          <p className='text-sm text-neutral-600'>
            Finalizar até {formattedTaskDate}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
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
      </div>
    </li>
  )
}

export default TaskItem
