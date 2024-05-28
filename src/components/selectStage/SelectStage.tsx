import { forwardRef, useState } from 'react'

import {
  Badge,
  Combobox,
  Input,
  InputBase,
  type InputBaseProps,
  ScrollArea,
  useCombobox
} from '@mantine/core'

import { UserStage } from '@/types/UserStage'

import { StageBadge } from '../StageBadge'
import styles from './SelectStage.module.css'

interface SelectStageProps extends InputBaseProps {
  onChange: (stage: UserStage | null) => void
  value: UserStage | null
  disabled?: boolean
  name?: string
  onBlur?: () => void
  options?: UserStage[]
  nullable?: boolean
}

export const SelectStage = forwardRef<HTMLButtonElement, SelectStageProps>(
  (
    { value, onChange, onBlur, options: givenOptions, nullable, ...props },
    ref
  ) => {
    const combobox = useCombobox({
      onDropdownClose: () => combobox.resetSelectedOption()
    })

    const options = (
      givenOptions || (Object.keys(UserStage) as UserStage[])
    ).map((stage) => (
      <Combobox.Option value={stage} key={stage}>
        <StageBadge stage={stage} />
      </Combobox.Option>
    ))

    return (
      <Combobox
        radius="lg"
        width="max-content"
        store={combobox}
        onOptionSubmit={(val) => {
          onChange(val ? (val as UserStage) : null)
          combobox.closeDropdown()
        }}
        classNames={styles}
      >
        <Combobox.Target>
          <InputBase
            ref={ref}
            radius="md"
            size="md"
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            onBlur={() => {
              combobox.closeDropdown()
              onBlur?.()
            }}
            {...props}
          >
            {value ? (
              <StageBadge stage={value} />
            ) : (
              <Input.Placeholder>Все</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize mah={200} scrollbarSize={6}>
              {nullable && (
                <Combobox.Option value="">
                  <Badge color="gray" variant="light">
                    Все
                  </Badge>
                </Combobox.Option>
              )}
              {options}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    )
  }
)
