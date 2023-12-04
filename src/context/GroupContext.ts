import { UserStageGroup } from '@/types/UserStageGroup'
import { createContext } from 'react'

export const GroupContext = createContext(UserStageGroup.ALL)
