import { UserStage } from '@/types/UserStage'
import { stageColor, stageName } from '@/utils/constants'
import { Badge } from '@mantine/core'
import { FC } from 'react'

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
