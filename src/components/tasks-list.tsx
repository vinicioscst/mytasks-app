import type { Task } from '../store/authStore'
import TaskItem from './task-item'

interface TasksListProps {
  tasks: Task[]
}

function TasksList({ tasks }: TasksListProps) {
  return (
    <ul className='space-y-2.5'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
        />
      ))}
    </ul>
  )
}

export default TasksList
