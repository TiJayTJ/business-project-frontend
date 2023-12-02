import { Stack, Text, Paper } from '@mantine/core'
import { FC, PropsWithChildren, ReactNode } from 'react'

interface PostInfoProps extends PropsWithChildren {
  label: ReactNode
}

export const PostInfo: FC<PostInfoProps> = ({ label, children }) => {
  return (
    <Stack gap={1}>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
      <Text>{children}</Text>
    </Stack>
  )
}
