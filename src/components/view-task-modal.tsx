import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import type { Task } from '../store/authStore'
import { Eye } from 'lucide-react'
import { Button } from '@heroui/react'
import { formatDate } from '../utils/actions/format-date'

interface ViewTaskModalProps {
  task: Task
}

function ViewTaskModal({ task }: ViewTaskModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const formattedTaskDate = formatDate(task.dueDate)

  return (
    <>
      <Button
        className='min-w-fit'
        size='sm'
        variant='flat'
        onPress={onOpen}
      >
        <Eye
          size={14}
          className='stroke-neutral-600 group-hover:stroke-neutral-500 transition-all'
        />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        size='lg'
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col'>
                {task.title}
                <small className='font-normal'>
                  {task.isCompleted
                    ? 'Concluído'
                    : `Concluir até ${formattedTaskDate}`}
                </small>
              </ModalHeader>
              {task.description && (
                <ModalBody>
                  <p>{task.description}</p>
                </ModalBody>
              )}
              <ModalFooter>
                <Button
                  color='default'
                  variant='flat'
                  onPress={onClose}
                  fullWidth
                >
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ViewTaskModal
