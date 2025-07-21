import type { Task } from '../store/authStore'
import TaskItem from './task-item'

interface TasksListProps {
  tasks: Task[]
  type: 'to-do' | 'completed'
}

function TasksList({ tasks, type }: TasksListProps) {
  return (
    <ul className='space-y-2.5'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          type={type}
        />
      ))}
    </ul>
  )
}

export default TasksList
