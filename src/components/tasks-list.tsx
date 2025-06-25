import type { Task } from '../pages/dashboard'

interface TasksListProps {
  tasks: Task[]
  type: 'to-do' | 'done'
}

function TasksList({ tasks }: TasksListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <p>{task.title}</p>
        </li>
      ))}
    </ul>
  )
}

export default TasksList
