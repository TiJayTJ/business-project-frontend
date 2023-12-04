import React, { FC, ButtonHTMLAttributes, forwardRef } from 'react'
import { Button, ButtonProps } from '@mantine/core'

interface MyButtonProps
  extends ButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'color'> {}

export const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ ...props }: MyButtonProps, ref) => {
    return (
      <Button ref={ref} {...props} variant="filled" size="md" radius="md" />
    )
  }
)
