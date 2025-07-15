import z from 'zod'

export const createUserSchema = z.object({
  name: z
    .string({ error: 'Nome deve ser texto' })
    .nonempty({ error: 'Nome é obrigatório' })
    .min(3, { error: 'Nome deve conter pelo menos 3 caracteres' })
    .max(60, { error: 'Nome deve conter no máximo 60 caracteres' }),
  email: z
    .email()
    .nonempty()
    .max(120, { error: 'Email deve conter no máximo 120 caracteres' }),
  password: z
    .string({ error: 'Senha é obrigatória' })
    .min(8, { error: 'Senha deve conter pelo menos 8 caracteres' })
    .max(60, { error: 'Senha deve conter no máximo 60 caracteres' })
    .regex(/(?=.*?[A-Z])/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/(?=.*?[a-z])/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/(?=.*?[0-9])/, 'Senha deve conter pelo menos um número')
    .regex(
      /(?=.*?[#?!@$%^&*-])/,
      'Senha deve conter pelo menos um caractere especial'
    )
})

export type TCreateUserSchema = z.infer<typeof createUserSchema>
