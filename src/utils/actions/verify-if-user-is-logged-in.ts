import type { User } from '../../store/authStore'

interface VerifyIfUserIsLoggedInParams {
  userData: User | null
  isLoading: boolean
  loadUser: () => Promise<void>
}

export async function verifyIfUserIsLoggedIn({
  userData,
  isLoading,
  loadUser
}: VerifyIfUserIsLoggedInParams) {
  if (!userData && !isLoading) {
    await loadUser()
  }
}
