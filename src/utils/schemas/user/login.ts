import z from 'zod'

export const loginSchema = z.object({
  email: z
    .email({ error: 'Formato de email inválido' })
    .nonempty({ error: 'Preencha o campo' }),
  password: z.string().nonempty({ error: 'Preencha o campo' })
})

export type TLoginSchema = z.infer<typeof loginSchema>
