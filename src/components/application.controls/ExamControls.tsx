import { Button, CheckIcon, Group } from '@mantine/core'
import { Refuse } from './Refuse'
import { Action, PropsWithId } from './controlTypes'
import { Confirm } from './Confirm'
import { useState } from 'react'
import { IconCheck, IconX } from '@tabler/icons-react'
import { UserStage } from '@/types/UserStage'
import { PassFailExam } from './PassFailExam'

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
