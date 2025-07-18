import z from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string({ error: 'Título deve ser texto' })
    .nonempty({ error: 'Título é obrigatório' })
    .max(60, { error: 'Título deve conter no máximo 60 caracteres' }),
  description: z
    .string({ error: 'Descrição deve ser texto' })
    .max(255, { error: 'Descrição deve conter no máximo 255 caracteres' })
    .nullable(),
  dueDate: z.date({ error: 'Vencimento deve ser uma data' }).nonoptional(),
  isCompleted: z
    .boolean({ error: 'Condição deve ser um booleano' })
    .nonoptional()
})

export type TCreateTaskSchema = z.infer<typeof createTaskSchema>
