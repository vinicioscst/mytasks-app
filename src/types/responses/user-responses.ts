import type { User } from '../../store/userStore'

export interface IUpdateUserResponse {
  user: Partial<User>
  accessToken?: string
}
