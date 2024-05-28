import React, { type FC } from 'react'

import { Flex, rem } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import { type SortValue } from '@/types/SortValue'

import { MyInput } from './UI/input/MyInput'
import { MySelect } from './UI/select/MySelect'

interface PostFilterProps {
  filter: {
    sort: SortValue
    query: string
  }
  setFilter: (e: { sort: SortValue; query: string }) => void
}

export const PostFilter: FC<PostFilterProps> = ({ filter, setFilter }) => {
  const icon = <IconSearch size={20} />
  return (
    <>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        type="txt"
        placeholder="Поиск..."
        w="100%"
        leftSectionPointerEvents="none"
        leftSection={icon}
      />
      <MySelect
        miw="20%"
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Сортировка"
        options={[
          { value: 'surname', label: 'По фамилии' },
          { value: 'name', label: 'По имени' },
          { value: 'patronymic', label: 'По отчеству' }
        ]}
      />
    </>
  )
}
