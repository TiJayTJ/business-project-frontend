import { createContext } from 'react'

import { UserStageGroup } from '@/types/UserStageGroup'

export const GroupContext = createContext(UserStageGroup.ALL)
