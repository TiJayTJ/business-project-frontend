import axios from 'axios'
import dayjs from 'dayjs'

import { type ConfirmParticipationParams } from '@/types/ConfirmParticipationParams'
import { type RefuseParticipationParams } from '@/types/RefuseParticipationParams'
import { type ReturnType } from '@/types/ReturnType'
import { type SendToProdParams } from '@/types/SendToProdParams'
import { type SubmitApplicationParams } from '@/types/SubmitApplicationParams'
import { type TakeEntranceTestParams } from '@/types/TakeEntranceTestParams'
import { type TakeExamParams } from '@/types/TakeExamParams'
import { type UserStage } from '@/types/UserStage'

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

  static async fromPeriod({
    startDateTime,
    endDateTime
  }: {
    startDateTime: Date
    endDateTime: Date
  }) {
    const start = dayjs(startDateTime).format('YYYY-MM-DD')
    const end = dayjs(endDateTime).format('YYYY-MM-DD')

    const response = await axios.get<Record<UserStage, number>>(
      `/training/get-from-period?startDateTime=${start}&endDateTime=${end}`
    )

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }
}
