import { type UserStage } from './UserStage'

export type EditEmployeeParams = {
  name: string
  surname: string
  patronymic: string
  job: string
  project: string
  purpose: string
  stage: UserStage
  leader: number
  start: Date
  reason: string | null
  active: boolean
}
