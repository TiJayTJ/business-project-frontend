import { ConfirmParticipationParams } from '@/types/ConfirmParticipationParams'
import { RefuseParticipationParams } from '@/types/RefuseParticipationParams'
import { SubmitApplicationParams } from '@/types/SubmitApplicationParams'
import axios from 'axios'

export default class TrainingService {
  static async submit(data: SubmitApplicationParams) {
    const response = await axios.post<number>(
      '/training/submit-application',
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async refuseParticipation(data: RefuseParticipationParams) {
    const response = await axios.post<string>(
      '/training/refuse-participation',
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async confirmParticipation(data: ConfirmParticipationParams) {
    const response = await axios.post<string>(
      '/training/confirm-participation',
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }
}
