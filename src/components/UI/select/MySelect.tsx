import React, { ChangeEvent, type FC } from 'react'

import { Select, type SelectProps } from '@mantine/core'

import { type Option } from '@/types/Option'
import { Post } from '@/types/Post'
import { type SortValue } from '@/types/SortValue'

import classes from './MySelect.module.css'

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
