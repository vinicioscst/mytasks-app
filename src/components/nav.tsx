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
import { Avatar } from '@heroui/react'
import { useNavigate } from 'react-router'
import { authStore } from '../store/authStore'

function Nav() {
  const navigate = useNavigate()
  const { logout, userData } = authStore((state) => state)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
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
                    src={userData?.avatar}
                    name={userData?.name[0].toUpperCase()}
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
                    <DropdownItem key='user-info'>
                      <div className='flex flex-col'>
                        <p className='font-semibold'>{userData?.name}</p>
                        <p>{userData?.email}</p>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection aria-label='Ações de usuário'>
                    <DropdownItem key='edit-profile'>
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
  )
}

export default Nav
