import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import { Button } from '@heroui/react'
import { BrushCleaning, LoaderCircle } from 'lucide-react'
import { tasksStore } from '../store/tasksStore'

function DeleteCompletedTasksModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { isLoading, deleteCompletedTasks } = tasksStore((state) => state)

  async function handleDelete() {
    await deleteCompletedTasks()
    onClose()
  }

  return (
    <>
      <Button
        size='sm'
        variant='bordered'
        startContent={<BrushCleaning size={16} />}
        onPress={onOpen}
      >
        Limpar
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
              <ModalHeader>
                <p>Deseja excluir todas as tarefas finalizadas?</p>
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

export default DeleteCompletedTasksModal
