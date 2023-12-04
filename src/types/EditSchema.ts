import { z } from 'zod'
import { UserStage } from './UserStage'

export const editSchema = z.object({
  leader: z.number({
    required_error: 'Обязательное поле'
  }),
  project: z.string().min(1, 'Обязательное поле'),
  name: z.string().min(2, 'Имя не менее 2 букв'),
  surname: z.string().min(2, 'Фамилия не менее 2 букв'),
  patronymic: z.string(),
  job: z.string().min(1, 'Обязательное поле'),
  purpose: z.string().min(1, 'Обязательное поле'),
  start: z.date({
    required_error: 'Обязательное поле'
  }),
  stage: z.nativeEnum(UserStage, {
    required_error: 'Обязательное поле'
  }),
  reason: z.string().nullable(),
  active: z.boolean()
})

export type EditSchema = z.infer<typeof editSchema>
