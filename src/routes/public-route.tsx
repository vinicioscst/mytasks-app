import { useEffect } from 'react'
import { authStore } from '../store/authStore'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { LoaderCircle } from 'lucide-react'

export function PublicRoute() {
  const { isLoggedIn, isLoading, loadUser, userData } = authStore()
  const navigate = useNavigate()

  useEffect(() => {
    async function verifyUser() {
      if (isLoggedIn && !isLoading) {
        if (!userData) {
          await loadUser()
          navigate('/dashboard')
          return
        } else {
          return
        }
      }
    }

    verifyUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className='min-h-dvh flex items-center justify-center'>
        <LoaderCircle className='animate-spin' />
      </div>
    )
  }

  return !isLoading && !userData ? <Outlet /> : <Navigate to='/dashboard' />
}
