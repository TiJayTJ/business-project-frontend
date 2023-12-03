import { UserStage } from '@/types/UserStage'
import { UserStageGroup } from '@/types/UserStageGroup'
import { DefaultMantineColor } from '@mantine/core'

export const stageName: Record<UserStage, string> = {
  [UserStage.WAITING_APPLICATION_TRAINING]: 'Ожидает одобрения заявки',
  [UserStage.REFUSAL_APPLICATION]: 'Отказ в заявке',
  [UserStage.PASSES_ENTRANCE_TEST]: 'Вступительный тест',
  [UserStage.FAILED_ENTRANCE_TEST]: 'Не прошел вступительный тест',
  [UserStage.STUDYING]: 'Обучение',
  [UserStage.EXPECTS_PRODUCTION_PRACTICE]: 'Ожидает производственную практику',
  [UserStage.PRODUCTION_PRACTICE]: 'Производственная практика',
  [UserStage.EXAM]: 'Экзамен',
  [UserStage.FAILED_EXAM]: 'Не сдал экзамен',
  [UserStage.PASSED_EXAM]: 'Сдал экзамен'
}

export const stageColor: Record<UserStage, DefaultMantineColor> = {
  [UserStage.WAITING_APPLICATION_TRAINING]: 'blue',
  [UserStage.REFUSAL_APPLICATION]: 'cyan',
  [UserStage.PASSES_ENTRANCE_TEST]: 'dark',
  [UserStage.FAILED_ENTRANCE_TEST]: 'grape',
  [UserStage.STUDYING]: 'gray',
  [UserStage.EXPECTS_PRODUCTION_PRACTICE]: 'green',
  [UserStage.PRODUCTION_PRACTICE]: 'indigo',
  [UserStage.EXAM]: 'lime',
  [UserStage.FAILED_EXAM]: 'orange',
  [UserStage.PASSED_EXAM]: 'pink'
}

export const groupName = {
  [UserStageGroup.ALL]: 'Все',
  [UserStageGroup.APPLICATION]: 'Заявки',
  [UserStageGroup.ENTRANCE_TEST]: 'Тест',
  [UserStageGroup.STUDYING]: 'Обучение',
  [UserStageGroup.PRODUCTION_PRACTICE]: 'Практика',
  [UserStageGroup.EXAM]: 'Экзамен'
}

export const groupColor: Record<UserStageGroup, DefaultMantineColor> = {
  [UserStageGroup.ALL]: 'gray',
  [UserStageGroup.APPLICATION]: 'blue',
  [UserStageGroup.ENTRANCE_TEST]: 'teal',
  [UserStageGroup.STUDYING]: 'orange',
  [UserStageGroup.PRODUCTION_PRACTICE]: 'indigo',
  [UserStageGroup.EXAM]: 'violet'
}

export const groupStages: Record<UserStageGroup, UserStage[]> = {
  [UserStageGroup.ALL]: [],
  [UserStageGroup.APPLICATION]: [
    UserStage.WAITING_APPLICATION_TRAINING,
    UserStage.REFUSAL_APPLICATION
  ],
  [UserStageGroup.ENTRANCE_TEST]: [
    UserStage.PASSES_ENTRANCE_TEST,
    UserStage.FAILED_ENTRANCE_TEST
  ],
  [UserStageGroup.STUDYING]: [UserStage.STUDYING],
  [UserStageGroup.PRODUCTION_PRACTICE]: [
    UserStage.EXPECTS_PRODUCTION_PRACTICE,
    UserStage.PRODUCTION_PRACTICE
  ],
  [UserStageGroup.EXAM]: [
    UserStage.EXAM,
    UserStage.PASSED_EXAM,
    UserStage.FAILED_EXAM
  ]
}
