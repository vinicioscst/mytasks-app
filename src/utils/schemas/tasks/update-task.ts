import z from 'zod'
import { createTaskSchema } from './create-task'

export const updateTaskSchema = createTaskSchema.partial()
export type TUpdateTaskSchema = z.infer<typeof updateTaskSchema>
