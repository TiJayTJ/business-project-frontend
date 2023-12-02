import React, { ChangeEvent, FC } from 'react'
import { Option } from '@/types/Option'
import { Post } from '@/types/Post'
import classes from './MySelect.module.css'
import { Select, SelectProps } from '@mantine/core'

interface MySelectProps extends Omit<SelectProps, 'onChange'> {
  value: string
  onChange: (e: keyof Post) => void
  options: Option[]
  defaultValue: string
}

export const MySelect: FC<MySelectProps> = ({
  options,
  defaultValue,
  value,
  onChange,
  ...props
}) => {
  return (
    <Select
      value={value}
      placeholder={defaultValue}
      onChange={(value) => onChange(value as keyof Post)}
      data={options}
      size="md"
      radius="md"
      {...props}
    />
  )
}
