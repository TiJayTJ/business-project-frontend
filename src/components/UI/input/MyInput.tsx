import React, { type FC, forwardRef } from 'react'

import { TextInput, type TextInputProps } from '@mantine/core'

interface MyInputProps extends TextInputProps {}

export const MyInput: FC<MyInputProps> = forwardRef<
  HTMLInputElement,
  MyInputProps
>((props, ref) => {
  return <TextInput ref={ref} {...props} size="md" radius="md" />
})
