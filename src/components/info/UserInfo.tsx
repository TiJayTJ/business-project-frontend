import { type FC, PropsWithChildren, type ReactNode } from 'react'

import { Input, Stack, Text } from '@mantine/core'

import { EditableInfo, type EditableInfoProps } from './EditableInfo'

interface PostInfoProps extends EditableInfoProps {
  label: ReactNode
  withAsterisk?: boolean
}

export const PostInfo: FC<PostInfoProps> = ({
  edit,
  label,
  children,
  withAsterisk,
  ...props
}) => {
  return (
    <Stack gap={2}>
      {edit && (
        <Input.Label size="md" required={withAsterisk}>
          {label}
        </Input.Label>
      )}
      {!edit && <Input.Description size="md">{label}</Input.Description>}
      <EditableInfo edit={edit} {...props}>
        <Text>{children}</Text>
      </EditableInfo>
    </Stack>
  )
}
