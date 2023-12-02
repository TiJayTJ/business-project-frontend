import React, {
  MouseEvent,
  FC,
  PropsWithChildren,
  ButtonHTMLAttributes
} from 'react'
import { Button, ButtonProps } from '@mantine/core'

interface MyButtonProps
  extends ButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'color'> {}

export const MyButton: FC<MyButtonProps> = ({ ...props }: MyButtonProps) => {
  return <Button {...props} variant="filled" size="md" radius="md" />
}
