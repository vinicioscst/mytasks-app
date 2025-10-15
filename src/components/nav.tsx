import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from '@heroui/dropdown'
import { Navbar, NavbarContent, NavbarItem } from '@heroui/navbar'
import { Avatar } from '@heroui/react'
import { LayoutList } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Container from '../components/container'
import { authStore } from '../store/authStore'
import { userStore } from '../store/userStore'
import UpdateUserModal from './update-user-modal'

function Nav() {
  const [isOpen, setIsOpen] = useState(false)
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
                        onPress={() => setIsOpen(true)}
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
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default Nav
