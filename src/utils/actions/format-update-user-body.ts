import type { User } from '../../store/userStore'
import type { TUpdateUserSchema } from '../schemas/user/update-user'

export function formatUpdateUserBody(
  originalUser: User,
  updatedUser: TUpdateUserSchema
) {
  const formattedUser: TUpdateUserSchema = {}

  for (const key of Object.keys(updatedUser) as Array<
    keyof TUpdateUserSchema
  >) {
    const updatedValue = updatedUser[key]
    const originalValue =
      key in originalUser ? originalUser[key as keyof User] : undefined

    const isEmptyOrEqual =
      updatedValue === undefined ||
      updatedValue === null ||
      updatedValue === '' ||
      updatedValue === originalValue

    if (isEmptyOrEqual) {
      continue
    }

    formattedUser[key] = updatedValue
  }

  return formattedUser
}
