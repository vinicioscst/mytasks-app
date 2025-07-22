import { useEffect } from 'react'
import { authStore } from '../store/authStore'
import { Navigate, Outlet } from 'react-router'
import { LoaderCircle } from 'lucide-react'
import { verifyIfUserIsLoggedIn } from '../utils/actions/verify-if-user-is-logged-in'

export function PrivateRoute() {
  const { isLoading, userData, loadUser } = authStore()

  useEffect(() => {
    verifyIfUserIsLoggedIn({
      userData,
      isLoading,
      loadUser
    })

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
