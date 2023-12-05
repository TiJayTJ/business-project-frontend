import { Button, CheckIcon, Group } from '@mantine/core'
import { Refuse } from './Refuse'
import { Action, PropsWithId } from './controlTypes'
import { Confirm } from './Confirm'
import { useState } from 'react'
import { IconCheck, IconX } from '@tabler/icons-react'
import { UserStage } from '@/types/UserStage'
import { PassFailExam } from './PassFailExam'
import { PracticeResult } from './PracticeResult'

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
