import z from 'zod'
import { createUserSchema } from './create-user'

export const updateUserSchema = createUserSchema.partial()
export type TUpdateUserSchema = z.infer<typeof updateUserSchema>
