import { rem } from '@mantine/core'
import {
  type NotificationData as MantineNotificationData,
  notifications as mantineNotifications
} from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

import { ReturnType } from '@/types/ReturnType'

type NotificationData = Omit<MantineNotificationData, 'message'> & {
  message?: string
}

const success = ({ message = '', ...data }: NotificationData) =>
  mantineNotifications.show({
    color: 'teal',
    icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
    radius: 'lg',
    message,
    ...data
  })

const error = ({ message = '', ...data }: NotificationData) =>
  mantineNotifications.show({
    color: 'red',
    icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
    radius: 'lg',
    message,
    ...data
  })

export const notifications = { success, error }

export const getNotify = (
  success: NotificationData,
  fail: NotificationData,
  timeUp: NotificationData,
  pastAction: NotificationData,
  result: ReturnType
) => {
  const isSuccess = result === ReturnType.SUCCESS

  const message = {
    [ReturnType.SUCCESS]: success,
    [ReturnType.FAIL]: fail,
    [ReturnType.TIME_UP]: timeUp,
    [ReturnType.PAST_ACTION]: pastAction
  }[result]

  const notify = isSuccess ? notifications.success : notifications.error

  return { notify: () => notify(message), success: isSuccess }
}
