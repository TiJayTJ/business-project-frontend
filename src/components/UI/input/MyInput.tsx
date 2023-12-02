import React, { FC } from 'react'
import { TextInput, TextInputProps } from '@mantine/core'

interface MyInputProps extends TextInputProps {}

export const MyInput: FC<MyInputProps> = (props) => {
  return <TextInput {...props} size="md" radius="md" />
}
