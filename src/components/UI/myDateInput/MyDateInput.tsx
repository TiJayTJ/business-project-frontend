import React, { FC, forwardRef } from 'react'
import { DateInput, DateInputProps } from '@mantine/dates'
import { dateFormat, dateParser } from '@/utils/constants'

interface MyDateInputProps extends DateInputProps {}

export const MyDateInput: FC<MyDateInputProps> = forwardRef<
  HTMLInputElement,
  MyDateInputProps
>((props, ref) => {
  return (
    <DateInput
      ref={ref}
      size="md"
      radius="md"
      placeholder="Выберите дату"
      maxDate={new Date()}
      valueFormat={dateFormat}
      dateParser={dateParser}
      {...props}
    />
  )
})
