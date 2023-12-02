import { Post } from '@/types/Post'
import axios from 'axios'

export default class PostService {
  static async getAll() {
    const response = await axios.get<Post[]>(
      'http://localhost:8080/api/employee/all'
    )

    return response.data
  }
}
