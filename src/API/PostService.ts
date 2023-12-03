import { Post } from '@/types/Post'
import { UserStage } from '@/types/UserStage'
import axios from 'axios'

export default class PostService {
  static async getPosts(stages: UserStage[]) {
    const params = stages.join('&stages=')

    const response = await axios.get<Post[]>(
      `http://localhost:8080/api/employees?stages=${params}`
    )

    await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }
}
