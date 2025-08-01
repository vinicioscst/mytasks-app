import { useEffect } from 'react'
import { userStore } from '../store/userStore'
import { Navigate, Outlet } from 'react-router'
import { LoaderCircle } from 'lucide-react'
import { verifyIfUserIsLoggedIn } from '../utils/actions/verify-if-user-is-logged-in'

export function PrivateRoute() {
  const { isLoading, getUser } = userStore()
  const { user } = userStore()

  useEffect(() => {
    verifyIfUserIsLoggedIn({
      user,
      isLoading,
      getUser
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

  return user ? <Outlet /> : <Navigate to='/' />
}
