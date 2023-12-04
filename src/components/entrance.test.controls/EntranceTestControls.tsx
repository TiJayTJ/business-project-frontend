import { Button, CheckIcon, Group } from '@mantine/core'
import { PropsWithId } from '../application.controls/controlTypes'

export const EntranceTestControls = ({ id }: PropsWithId) => {
  return (
    <Button
      mr="md"
      component="div"
      radius="lg"
      size="md"
      style={{ pointerEvents: 'none' }}
      variant="light"
      onClick={() => {}}
    >
      {'Результат теста'}
    </Button>
  )
}
