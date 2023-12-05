import { ConfirmParticipationParams } from '@/types/ConfirmParticipationParams'
import { RefuseParticipationParams } from '@/types/RefuseParticipationParams'
import { ReturnType } from '@/types/ReturnType'
import { SendToProdParams } from '@/types/SendToProdParams'
import { SubmitApplicationParams } from '@/types/SubmitApplicationParams'
import { TakeEntranceTestParams } from '@/types/TakeEntranceTestParams'
import { TakeExamParams } from '@/types/TakeExamParams'
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
    const response = await axios.post<ReturnType>(
      '/training/refuse-participation',
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async confirmParticipation(data: ConfirmParticipationParams) {
    const response = await axios.post<ReturnType>(
      '/training/confirm-participation',
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async takeEntranceTest({
    id,
    data
  }: {
    id: number
    data: TakeEntranceTestParams
  }) {
    const response = await axios.post<ReturnType>(
      `/training/take-entrance-test/${id}`,
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async takeExam({ id, data }: { id: number; data: TakeExamParams }) {
    const response = await axios.post<string>(`/training/take-exam/${id}`, data)

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async sendToProd(data: SendToProdParams) {
    const response = await axios.post<string>(
      `/training/send-to-production-practice`,
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async practiceResult({
    id,
    data
  }: {
    id: number
    data: TakeExamParams
  }) {
    const response = await axios.post<string>(
      `/training/production-practice-result/${id}`,
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async takePractice({
    id,
    data
  }: {
    id: number
    data: TakeEntranceTestParams
  }) {
    const response = await axios.post<ReturnType>(
      `/training/take-practice-task/${id}`,
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async takeModule({
    id,
    data
  }: {
    id: number
    data: TakeEntranceTestParams
  }) {
    const response = await axios.post<ReturnType>(
      `/training/take-module-test/${id}`,
      data
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }
}
