import type { User } from '../../store/userStore'

interface VerifyIfUserIsLoggedInParams {
  user: User | null
  isLoading: boolean
  getUser: () => Promise<void>
}

export async function verifyIfUserIsLoggedIn({
  user,
  isLoading,
  getUser
}: VerifyIfUserIsLoggedInParams) {
  if (!user && !isLoading) {
    await getUser()
  }
}
