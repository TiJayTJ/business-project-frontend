import { z } from 'zod'

export const signUpSchema = z.object({
  leaderId: z.number({
    required_error: 'Обязательное поле'
  }),
  project: z.string().min(1, 'Обязательное поле'),
  employeeName: z.string().min(2, 'Имя не менее 2 букв'),
  employeeSurname: z.string().min(2, 'Фамилия не менее 2 букв'),
  employeePatronymic: z.string(),
  employeeJobTitle: z.string().min(1, 'Обязательное поле'),
  trainingPurpose: z.string().min(1, 'Обязательное поле'),
  date: z.date({
    required_error: 'Обязательное поле'
  })
})

export type SignUpSchema = z.infer<typeof signUpSchema>
