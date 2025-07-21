import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import { Button } from '@heroui/react'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { tasksStore } from '../store/tasksStore'

interface DeleteTaskModalProps {
  taskId: string
  taskTitle: string
}

function DeleteTaskModal({ taskId, taskTitle }: DeleteTaskModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isLoading, deleteTask } = tasksStore((state) => state)

  async function handleDelete() {
    await deleteTask(taskId)
  }

  return (
    <>
      <Trash2
        className='fill-red-100 stroke-red-500 cursor-pointer'
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        size='lg'
      >
        <ModalContent className='gap'>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>
                  Deseja excluir a tarefa <span>{taskTitle}</span>?
                </p>
              </ModalHeader>
              <ModalBody className='gap-0'>
                <p>
                  <span className='font-bold'>Atenção:</span> Essa ação não
                  poderá ser revertida
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='default'
                  variant='flat'
                  onPress={onClose}
                  fullWidth
                >
                  Fechar
                </Button>
                <Button
                  className='disabled:bg-danger-800 disabled:text-danger-600'
                  color='danger'
                  variant='flat'
                  onPress={handleDelete}
                  disabled={isLoading}
                  fullWidth
                >
                  {isLoading ? (
                    <LoaderCircle className='animate-spin' />
                  ) : (
                    'Excluir'
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteTaskModal
