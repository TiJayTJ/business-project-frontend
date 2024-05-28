import { useState } from 'react'

import { Button, CheckIcon, Group } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

import { UserStage } from '@/types/UserStage'

import { Confirm } from './Confirm'
import { PassFailExam } from './PassFailExam'
import { Refuse } from './Refuse'
import { Action, type PropsWithId } from './controlTypes'

interface ExamControlsProps extends PropsWithId {
  stage: UserStage
}

export const ExamControls = ({ id, stage }: ExamControlsProps) => {
  const [action, setAction] = useState<Action | null>(null)

  const confirm = action === Action.CONFIRM
  const refuse = action === Action.REFUSE

  return (
    <Group gap="sm">
      {action === null && (
        <>
          <PassFailExam
            id={id}
            setAction={() => setAction(Action.CONFIRM)}
            disabled={confirm}
            res={true}
          />
          {stage !== UserStage.FAILED_EXAM && (
            <PassFailExam
              id={id}
              setAction={() => setAction(Action.REFUSE)}
              disabled={refuse}
              res={false}
            />
          )}
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
