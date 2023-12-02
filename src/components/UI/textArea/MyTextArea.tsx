import React, { FC } from 'react'
import { Textarea, TextareaProps } from '@mantine/core'

interface MyTextAreaProps extends TextareaProps {}

export const MyTextArea: FC<MyTextAreaProps> = (props) => {
  return <Textarea {...props} />
}
