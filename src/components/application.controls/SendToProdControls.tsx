import { useState } from 'react'

import { Button, CheckIcon, Group } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

import { UserStage } from '@/types/UserStage'

import { Confirm } from './Confirm'
import { PassFailExam } from './PassFailExam'
import { Refuse } from './Refuse'
import { SendToProd } from './SendToProd'
import { Action, type PropsWithId } from './controlTypes'

export const SendToProdControls = ({ id }: PropsWithId) => {
  const [action, setAction] = useState<boolean>(false)

  return (
    <Group gap="sm">
      {!action && (
        <SendToProd
          id={id}
          setAction={() => setAction(true)}
          disabled={false}
        />
      )}
      {action && (
        <Button
          component="div"
          leftSection={<IconCheck />}
          radius="lg"
          size="md"
          style={{ pointerEvents: 'none' }}
          color="indigo"
          variant="light"
        >
          На практике
        </Button>
      )}
    </Group>
  )
}
