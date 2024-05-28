import {
  type Dispatch,
  type FC,
  type FormEventHandler,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction
} from 'react'

import {
  ActionIcon,
  type DefaultMantineColor,
  Popover,
  Stack,
  Text
} from '@mantine/core'
import { AxiosError } from 'axios'

import { type BackendError } from '@/types/BackendError'

import { MyButton } from '../UI/button/MyButton'

interface ControlPopoverProps extends PropsWithChildren {
  icon: ReactNode
  action: FormEventHandler<HTMLFormElement>
  color: DefaultMantineColor
  loading: boolean
  error: Error | null
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  disabled?: boolean
}

export const ControlPopover: FC<ControlPopoverProps> = ({
  icon,
  action,
  children,
  color,
  loading,
  error,
  opened,
  setOpened,
  disabled
}: ControlPopoverProps) => {
  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={300}
      position="bottom"
      withArrow
      shadow="md"
      radius="lg"
    >
      <Popover.Target>
        <ActionIcon
          disabled={disabled}
          onClick={() => setOpened((o) => !o)}
          variant="light"
          size="xl"
          radius="xl"
          color={color}
        >
          {icon}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown bg="var(--mantine-color-body)">
        <form onSubmit={action}>
          <Stack gap="sm">{children}</Stack>

          <Stack mt="lg">
            {error && (
              <Text fz="sm" c="red">
                Произошла ошибка:{' '}
                {(error as unknown as BackendError).response.data.message}
              </Text>
            )}
            <MyButton fullWidth type="submit" loading={loading}>
              Подтвердить
            </MyButton>
          </Stack>
        </form>
      </Popover.Dropdown>
    </Popover>
  )
}
