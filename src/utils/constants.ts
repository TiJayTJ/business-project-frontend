import { UserStage } from '@/types/UserStage'

export const stageName = {
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
