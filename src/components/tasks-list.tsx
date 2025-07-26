import type { Task } from '../store/authStore'
import { tasksStore } from '../store/tasksStore'
import TaskItem from './task-item'
import TaskItemSkeleton from './task-item-skeleton'

interface TasksListProps {
  tasks: Task[]
}

function TasksList({ tasks }: TasksListProps) {
  const { isLoading } = tasksStore((state) => state)

  return (
    <ul className={isLoading ? 'space-y-5' : 'space-y-2.5'}>
      {isLoading
        ? Array.from({ length: 2 }, (_, index) => (
            <TaskItemSkeleton key={index} />
          ))
        : tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))}
    </ul>
  )
}

export default TasksList
