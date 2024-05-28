import { useState } from 'react'

import { Button, CheckIcon, Group } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

import { UserStage } from '@/types/UserStage'

import { Confirm } from './Confirm'
import { PassFailExam } from './PassFailExam'
import { PracticeResult } from './PracticeResult'
import { Refuse } from './Refuse'
import { Action, type PropsWithId } from './controlTypes'

export const PracticeControls = ({ id }: PropsWithId) => {
  const [action, setAction] = useState<Action | null>(null)

  const confirm = action === Action.CONFIRM
  const refuse = action === Action.REFUSE

  return (
    <Group gap="sm">
      {action === null && (
        <>
          <PracticeResult
            id={id}
            setAction={() => setAction(Action.CONFIRM)}
            disabled={confirm}
            res={true}
          />
          <PracticeResult
            id={id}
            setAction={() => setAction(Action.REFUSE)}
            disabled={refuse}
            res={false}
          />
        </>
      )}
      {action !== null && (
        <Button
          component="div"
          leftSection={confirm ? <IconCheck /> : <IconX />}
          radius="lg"
          size="md"
          style={{ pointerEvents: 'none' }}
          color={confirm ? 'green' : 'red'}
          variant="light"
        >
          {confirm ? 'Сдал' : 'Не сдал'}
        </Button>
      )}
    </Group>
  )
}
