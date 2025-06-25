import type { Task } from '../data/tasks'
import TaskItem from './task-item'

interface TasksListProps {
  tasks: Task[]
  type: 'to-do' | 'done'
}

function TasksList({ tasks, type }: TasksListProps) {
  return (
    <ul className='space-y-2.5'>
      {tasks.map((task) => (
        <TaskItem
          task={task}
          type={type}
        />
      ))}
    </ul>
  )
}

export default TasksList
