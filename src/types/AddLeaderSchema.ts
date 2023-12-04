import { z } from 'zod'

export const addLeaderSchema = z.object({
  name: z.string().min(2, 'Имя не менее 2 букв'),
  surname: z.string().min(2, 'Фамилия не менее 2 букв'),
  patronymic: z.string(),
  job: z.string().min(1, 'Обязательное поле')
})

export type AddLeaderSchema = z.infer<typeof addLeaderSchema>
