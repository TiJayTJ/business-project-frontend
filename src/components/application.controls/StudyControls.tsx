import { useState } from 'react'

import { Button, CheckIcon, Group } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

import { Confirm } from './Confirm'
import { Refuse } from './Refuse'
import { Study } from './Study'
import { Action, type PropsWithId } from './controlTypes'

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
