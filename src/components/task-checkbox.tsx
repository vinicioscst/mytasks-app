import { Checkbox } from '@heroui/react'
import { tasksStore } from '../store/tasksStore'

interface TaskCheckboxProps {
  isSelected: boolean
  taskTitle: string
  taskId: string
}

function TaskCheckbox({ isSelected, taskTitle, taskId }: TaskCheckboxProps) {
  const { updateTask } = tasksStore((state) => state)

  async function handleSelection() {
    const body = {
      isCompleted: !isSelected
    }

    await updateTask(body, taskId)
  }

  return (
    <Checkbox
      isSelected={isSelected}
      lineThrough={isSelected}
      color={isSelected ? 'secondary' : 'default'}
      onChange={handleSelection}
    >
      <p className='font-medium line-clamp-2 sm:line-clamp-1'>{taskTitle}</p>
    </Checkbox>
  )
}

export default TaskCheckbox
