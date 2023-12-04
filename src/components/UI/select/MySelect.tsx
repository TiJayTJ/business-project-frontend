import React, { ChangeEvent, FC } from 'react'
import { Option } from '@/types/Option'
import { Post } from '@/types/Post'
import classes from './MySelect.module.css'
import { Select, SelectProps } from '@mantine/core'
import { SortValue } from '@/types/SortValue'

interface MySelectProps extends Omit<SelectProps, 'onChange'> {
  value: SortValue
  onChange: (e: SortValue) => void
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
      onChange={(value) => onChange(value as SortValue)}
      data={options}
      size="md"
      radius="md"
      {...props}
    />
  )
}
