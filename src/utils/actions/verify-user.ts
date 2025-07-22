import type { User } from '../../store/authStore'

interface VerifyUserParams {
  userData: User | null
  isLoading: boolean
  loadUser: () => Promise<void>
}

export async function verifyUser({
  userData,
  isLoading,
  loadUser
}: VerifyUserParams) {
  if (!userData && !isLoading) {
    await loadUser()
  }
}
