import { Button, CheckIcon, Group } from '@mantine/core'
import { Refuse } from './Refuse'
import { Action, PropsWithId } from './controlTypes'
import { Confirm } from './Confirm'
import { useState } from 'react'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Study } from './Study'

export const StudyControls = ({ id }: PropsWithId) => {
  const [action, setAction] = useState(true)

  return (
    action && (
      <Group gap="sm">
        <Study
          id={id}
          setAction={() => setAction(false)}
          disabled={false}
          practice={false}
        />
        <Study
          id={id}
          setAction={() => setAction(false)}
          disabled={false}
          practice={true}
        />
      </Group>
    )
  )
}
