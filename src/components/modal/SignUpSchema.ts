import { z } from 'zod'

export const signUpSchema = z.object({
  leaderName: z.string().min(2, 'Имя: не менее 2 букв'),
  leaderSurname: z.string().min(2, 'Фамилия: не менее 2 букв'),
  leaderPatronymic: z.string(),
  leaderJobTitle: z.string().min(1, 'Обязательное поле'),
  project: z.string().min(1, 'Обязательное поле'),
  employeeName: z.string().min(2, 'Имя: не менее 2 букв'),
  employeeSurname: z.string().min(2, 'Фамилия: не менее 2 букв'),
  employeePatronymic: z.string(),
  employeeJobTitle: z.string().min(1, 'Обязательное поле'),
  trainingPurpose: z.string().min(1, 'Обязательное поле'),
  date: z.date({
    required_error: 'Обязательное поле'
  })
})
