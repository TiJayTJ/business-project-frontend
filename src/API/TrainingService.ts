import { SubmitApplicationParams } from '@/types/SubmitApplicationParams'
import axios from 'axios'

export default class TrainingService {
  static async submit(data: SubmitApplicationParams) {
    const response = await axios.post<number>(
      'http://localhost:8080/api/training/submit-application',
      data
    )

    return response.data
  }
}
