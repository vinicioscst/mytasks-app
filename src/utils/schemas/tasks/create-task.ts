import { CalendarDate } from '@internationalized/date'
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
  dueDate: z
    .union([
      z.null(),
      z.instanceof(CalendarDate, { error: 'Vencimento deve ser uma data' })
    ])
    .refine(
      (calendarDate) => {
        if (!calendarDate) return true

        const today = new Date()
        const todayCalendar = new CalendarDate(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate()
        )

        return calendarDate.compare(todayCalendar) >= 0
      },
      {
        error: 'Vencimento deve ser hoje ou uma data futura'
      }
    )
    .transform((calendarDate) => {
      if (calendarDate) {
        return new Date(
          calendarDate.year,
          calendarDate.month - 1,
          calendarDate.day
        )
      }
    })
    .nonoptional(),
  isCompleted: z
    .boolean({ error: 'Condição deve ser um booleano' })
    .nonoptional()
})

export type TCreateTaskSchema = z.infer<typeof createTaskSchema>
