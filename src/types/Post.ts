import { Leader } from './Leader'
import { UserStage } from './UserStage'

export type Post = {
  id: number
  surname: string
  name: string
  patronymic: string
  jobTitle: string
  project: string
  trainingPurpose: string
  stage: UserStage
  leader: Leader
  startTime: Date
  reasonForRefuseTraining: string | null
  active: boolean
}
