import type { User } from '../../store/userStore'

export interface IAuthUserResponse {
  user: User
  accessToken: string
}
