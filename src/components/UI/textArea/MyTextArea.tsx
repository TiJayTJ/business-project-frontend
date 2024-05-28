import React, { type FC, forwardRef } from 'react'

import { Textarea, type TextareaProps } from '@mantine/core'

interface MyTextAreaProps extends TextareaProps {}

export const MyTextArea: FC<MyTextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  MyTextAreaProps
>((props, ref) => {
  return <Textarea ref={ref} size="md" radius="md" {...props} />
})
