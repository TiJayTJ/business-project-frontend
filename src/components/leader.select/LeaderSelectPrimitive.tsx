import { type Dispatch, FC, forwardRef, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  type InputBaseProps,
  Loader,
  ScrollArea,
  Skeleton,
  Stack,
  useCombobox
} from '@mantine/core'
import { usePrevious } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'

import { type Leader } from '@/types/Leader'

import { LeaderSelectOption } from './LeaderSelectOption'
import styles from './LeaderSelectPrimitive.module.css'

type LeaderId = Leader['id'] | null

export interface LeaderSelectPrimitiveProps extends InputBaseProps {
  options: Leader[]
  value: LeaderId | null
  onChange: Dispatch<LeaderId>
  onCreate: () => void
  search: string
  setSearch: Dispatch<string>
  loading?: boolean
  withinPortal?: boolean
}

export const LeaderSelectPrimitive = forwardRef<
  HTMLButtonElement,
  LeaderSelectPrimitiveProps
>(
  (
    {
      options: data,
      value,
      onChange,
      onCreate,
      search,
      setSearch,
      loading,
      withinPortal = true,
      ...props
    },
    ref
  ) => {
    const combobox = useCombobox({
      onDropdownClose: () => {
        combobox.resetSelectedOption()
        combobox.focusTarget()
        setSearch('')
      },

      onDropdownOpen: () => {
        combobox.focusSearchInput()
      }
    })

    const options = data.map((item) => (
      <Combobox.Option value={item.id.toString()} key={item.id} py={6}>
        <LeaderSelectOption {...item} />
      </Combobox.Option>
    ))

    const current = useMemo(() => {
      if (value === null) return null

      const found = data.find((item) => item.id === value)

      return found
    }, [value, data])

    return (
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          const id = Number.parseInt(val) as LeaderId

          onChange(id)

          combobox.closeDropdown()
        }}
        size="md"
        radius="md"
        classNames={{ option: styles.option }}
        withinPortal={withinPortal}
      >
        <Combobox.Target>
          <InputBase
            ref={ref}
            radius="md"
            size="md"
            component="button"
            type="button"
            pointer
            rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            classNames={{ input: styles.input }}
            {...props}
          >
            {current && <LeaderSelectOption {...current} py="xs" />}
            {!current && (
              <Input.Placeholder>Выберите руководителя</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Search
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Поиск"
              size="md"
              radius="md"
            />
            <ScrollArea.Autosize mah={200} scrollbarSize={6}>
              <Button
                radius="md"
                size="md"
                fullWidth
                className={styles.create}
                justify="flex-start"
                leftSection={<IconPlus />}
                onClick={() => {
                  combobox.closeDropdown()
                  onCreate()
                }}
              >
                Новый
              </Button>

              {loading && [
                [...Array(2)].map((_, id) => (
                  <Group gap="sm" p="sm" py={6} key={id}>
                    <Skeleton circle height={38} width={38} />
                    <Stack gap={4}>
                      <Skeleton height={16} width={200} />
                      <Skeleton height={12} width={50} />
                    </Stack>
                  </Group>
                ))
              ]}
              {!loading && options.length === 0 && (
                <Combobox.Empty>Не найдено</Combobox.Empty>
              )}
              {options}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    )
  }
)
