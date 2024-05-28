import { forwardRef, type ButtonHTMLAttributes } from 'react'

import { Button, type ButtonProps } from '@mantine/core'

interface MyButtonProps
  extends ButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'color'> {}

export const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ ...props }: MyButtonProps, ref) => {
    return (
      <Button ref={ref} variant="filled" size="md" radius="md" {...props} />
    )
  }
)
