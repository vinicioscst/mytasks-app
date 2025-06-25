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

function Nav() {
  const navigate = useNavigate()

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
                    className='transition-transform'
                    src='https://github.com/vinicioscst.png'
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
                      <p className='font-semibold'>vinicios@email.com</p>
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
                      onClick={() => navigate('/')}
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
