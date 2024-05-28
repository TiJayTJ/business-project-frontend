import { type FC } from 'react'

import { Avatar, Group, type GroupProps, Stack, Text } from '@mantine/core'

import { type Leader } from '@/types/Leader'

interface LeaderSelectOptionProps extends Leader, Omit<GroupProps, 'id'> {}

export const LeaderSelectOption: FC<LeaderSelectOptionProps> = ({
  id,
  name,
  surname,
  patronymic,
  jobTitle,
  ...props
}) => {
  return (
    <Group gap="sm" wrap="nowrap" {...props}>
      <Avatar />
      <Stack gap={2}>
        <Text size="sm" fw={500}>
          {surname} {name} {patronymic}
        </Text>
        <Text size="xs" c="dimmed">
          {jobTitle}
        </Text>
      </Stack>
    </Group>
  )
}
