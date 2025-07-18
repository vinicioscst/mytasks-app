import z from 'zod/v4'

const envSchema = z
  .string()
  .nonempty({ error: 'VITE_API_BASE_URL variable is empty' })

export const apiUrl = envSchema.parse(import.meta.env.VITE_API_BASE_URL)
