import { type FC } from 'react'

import { Badge } from '@mantine/core'

import { type UserStage } from '@/types/UserStage'
import { stageColor, stageName } from '@/utils/constants'

interface StageBadgeProps {
  stage: UserStage
}

export const StageBadge: FC<StageBadgeProps> = ({ stage }) => {
  return (
    <Badge color={stageColor[stage]} variant="light">
      {stageName[stage]}
    </Badge>
  )
}
