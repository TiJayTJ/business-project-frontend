import { AddLeaderParams } from '@/types/AddLeaderParams'
import { Leader } from '@/types/Leader'
import axios from 'axios'

export class LeadersService {
  static async get(search: string): Promise<Leader[]> {
    const response = await axios.get<Leader[]>(`/leaders?search=${search}`)

    await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }

  static async add(data: AddLeaderParams) {
    const response = await axios.post<number>('/leaders', data)

    // await new Promise((resolve) => setTimeout(resolve, 500))

    return response.data
  }
}
