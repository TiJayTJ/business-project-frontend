import { Button, CheckIcon, Group } from '@mantine/core'
import { Refuse } from './Refuse'
import { Action, PropsWithId } from './controlTypes'
import { Confirm } from './Confirm'
import { useState } from 'react'
import { IconCheck, IconX } from '@tabler/icons-react'
export const ApplicationControls = ({ id }: PropsWithId) => {
  const [action, setAction] = useState<Action | null>(null)

  const confirm = action === Action.CONFIRM
  const refuse = action === Action.REFUSE

  return (
    <Group gap="sm">
      {action === null && (
        <>
          <Confirm
            id={id}
            setAction={(result) =>
              setAction(result ? Action.CONFIRM : Action.REFUSE)
            }
            disabled={confirm}
          />
          <Refuse
            id={id}
            setAction={() => setAction(Action.REFUSE)}
            disabled={refuse}
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
          {confirm ? 'Одобрена' : 'Отклонена'}
        </Button>
      )}
    </Group>
  )
}
