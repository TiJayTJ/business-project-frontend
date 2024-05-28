import axios from 'axios'

import { type EditEmployeeParams } from '@/types/EditEmployeeParams'
import { type Post } from '@/types/Post'
import { type UserStage } from '@/types/UserStage'

type ServerPost = Post & {
  startTime: string
}

export default class PostService {
  static async get(stages: UserStage[], search: string): Promise<Post[]> {
    const params = stages.join('&stages=')

    const response = await axios.get<ServerPost[]>(
      `/employees?stages=${params}&search=${search}`
    )

    await new Promise((resolve) => setTimeout(resolve, 500))

    const data = response.data

    const corrected: Post[] = data.map(({ startTime, ...other }) => ({
      ...other,
      startTime: new Date(startTime)
    }))

    return corrected
  }

  static async getById(id: number): Promise<Post> {
    const response = await axios.get<ServerPost>(`/employees/${id}`)

    // await new Promise((resolve) => setTimeout(resolve, 500))

    const data = response.data

    const corrected: Post = {
      ...data,
      startTime: new Date(data.startTime)
    }

    return corrected
  }

  static async edit({ id, data }: { id: number; data: EditEmployeeParams }) {
    const response = await axios.put<string>(`/employees/${id}`, data)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return response.data
  }
}
