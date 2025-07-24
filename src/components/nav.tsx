import { LayoutList } from 'lucide-react'
import Container from '../components/container'
import { Navbar, NavbarContent, NavbarItem } from '@heroui/navbar'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@heroui/dropdown'
import { Avatar, useDisclosure } from '@heroui/react'
import { useNavigate } from 'react-router'
import { authStore } from '../store/authStore'
import UpdateUserModal from './update-user-modal'
import { userStore } from '../store/userStore'

function Nav() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const navigate = useNavigate()
  const { logout } = authStore((state) => state)
  const { user } = userStore((state) => state)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <>
      <Navbar
        maxWidth='full'
        className='shadow-sm'
      >
        <Container>
          <div className='flex items-center'>
            <NavbarItem className='flex items-center gap-2 select-none'>
              <LayoutList className='stroke-violet-500 fill-violet-300' />
              <h1 className='text-2xl font-bold'>My Tasks</h1>
            </NavbarItem>
            <NavbarContent justify='end'>
              <NavbarItem>
                <Dropdown placement='bottom-end'>
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as='button'
                      className='transition-transform cursor-pointer'
                      src={user?.avatar}
                      name={user?.name[0].toUpperCase()}
                      showFallback
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='Menu de usuário'
                    variant='flat'
                  >
                    <DropdownSection
                      aria-label='Informações de usuário'
                      showDivider
                    >
                      <DropdownItem
                        key='user-info'
                        textValue='Informações de usuário'
                      >
                        <div className='flex flex-col'>
                          <p className='font-semibold'>{user?.name}</p>
                          <p>{user?.email}</p>
                        </div>
                      </DropdownItem>
                    </DropdownSection>
                    <DropdownSection aria-label='Ações de usuário'>
                      <DropdownItem
                        key='edit-profile'
                        onPress={onOpen}
                      >
                        <p>Editar informações</p>
                      </DropdownItem>
                      <DropdownItem
                        key='logout'
                        className='text-danger'
                        color='danger'
                        onClick={() => handleLogout()}
                      >
                        Fazer logout
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </NavbarContent>
          </div>
        </Container>
      </Navbar>
      <UpdateUserModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  )
}

export default Nav
