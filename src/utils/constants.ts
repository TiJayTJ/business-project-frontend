import { type DefaultMantineColor } from '@mantine/core'
import { type DateInputProps } from '@mantine/dates'
import dayjs from 'dayjs'

import { UserStage } from '@/types/UserStage'
import { UserStageGroup } from '@/types/UserStageGroup'

export const dateFormat = 'D MMMM YYYY'
export const dateParser: DateInputProps['dateParser'] = (input) =>
  dayjs(
    input,
    [
      dateFormat,
      'D.M.YYYY',
      'DD.MM.YYYY',
      'D/M/YYYY',
      'DD/MM/YYYY',
      'D-M-YYYY',
      'DD-MM-YYYY'
    ],
    'ru'
  ).toDate()

export const stageName: Record<UserStage, string> = {
  [UserStage.WAITING_APPLICATION_TRAINING]: 'Ожидает одобрения заявки',
  [UserStage.REFUSAL_APPLICATION]: 'Отказ в заявке',
  [UserStage.PASSES_ENTRANCE_TEST]: 'Вступительный тест',
  [UserStage.FAILED_ENTRANCE_TEST]: 'Не прошел вступительный тест',
  [UserStage.STUDYING]: 'Обучение',
  [UserStage.FAILED_STUDYING]: 'Провалил обучение',
  [UserStage.EXPECTS_PRODUCTION_PRACTICE]: 'Ожидает производственную практику',
  [UserStage.PRODUCTION_PRACTICE]: 'Производственная практика',
  [UserStage.EXAM]: 'Экзамен',
  [UserStage.GRADUATED]: 'Выпущен',
  [UserStage.FAILED_EXAM]: 'Не сдал'
}

export const stageColor: Record<UserStage, DefaultMantineColor> = {
  [UserStage.WAITING_APPLICATION_TRAINING]: 'blue',
  [UserStage.REFUSAL_APPLICATION]: 'red',
  [UserStage.PASSES_ENTRANCE_TEST]: 'teal',
  [UserStage.FAILED_ENTRANCE_TEST]: 'red',
  [UserStage.STUDYING]: 'orange',
  [UserStage.FAILED_STUDYING]: 'pink',
  [UserStage.EXPECTS_PRODUCTION_PRACTICE]: 'cyan',
  [UserStage.PRODUCTION_PRACTICE]: 'indigo',
  [UserStage.EXAM]: 'violet',
  [UserStage.GRADUATED]: 'lime',
  [UserStage.FAILED_EXAM]: 'red'
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
  [UserStageGroup.STUDYING]: [UserStage.STUDYING, UserStage.FAILED_STUDYING],
  [UserStageGroup.PRODUCTION_PRACTICE]: [
    UserStage.EXPECTS_PRODUCTION_PRACTICE,
    UserStage.PRODUCTION_PRACTICE
  ],
  [UserStageGroup.EXAM]: [
    UserStage.EXAM,
    UserStage.GRADUATED,
    UserStage.FAILED_EXAM
  ]
}
