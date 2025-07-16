import { useEffect } from 'react'
import { authStore } from '../store/authStore'
import { Navigate, Outlet } from 'react-router'
import { LoaderCircle } from 'lucide-react'

export function PrivateRoute() {
  const { isLoggedIn, isLoading, loadUser, userData } = authStore()

  useEffect(() => {
    async function verifyUser() {
      if (isLoggedIn && !isLoading && !userData) {
        await loadUser()
        return
      }
      return
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

  return userData ? <Outlet /> : <Navigate to='/' />
}
