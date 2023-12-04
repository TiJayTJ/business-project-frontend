import { rem } from '@mantine/core'
import {
  NotificationData,
  notifications as mantineNotifications
} from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

const success = (data: NotificationData) =>
  mantineNotifications.show({
    color: 'teal',
    icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
    radius: 'lg',
    ...data
  })

const error = (data: NotificationData) =>
  mantineNotifications.show({
    color: 'red',
    icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
    radius: 'lg',
    ...data
  })

export const notifications = { success, error }
