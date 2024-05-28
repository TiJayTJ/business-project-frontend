import { FC, forwardRef, useEffect, useState } from 'react'

import { useDisclosure } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

import { LeadersService } from '@/API/LeadersService'
import { Leader } from '@/types/Leader'

import { AddLeaderModal } from '../modal/AddLeaderModal'
import {
  LeaderSelectPrimitive,
  type LeaderSelectPrimitiveProps
} from './LeaderSelectPrimitive'

interface LeaderSelectProps
  extends Omit<
    LeaderSelectPrimitiveProps,
    'options' | 'search' | 'setSearch' | 'loading' | 'onCreate'
  > {
  onCreate?: () => void
  onCreateEnd?: () => void
}

export const LeaderSelect = forwardRef<HTMLButtonElement, LeaderSelectProps>(
  ({ onChange, onCreate, onCreateEnd, ...props }, ref) => {
    const [dirtySearch, setDirtySearch] = useState('')
    const [opened, { open, close }] = useDisclosure(false)

    const [search] = useDebounce(dirtySearch, 500)

    const { data, isPending } = useQuery({
      queryKey: ['leaders', search],
      queryFn: () => LeadersService.get(search)
    })

    return (
      <>
        <AddLeaderModal
          opened={opened}
          onClose={() => {
            close()
            onCreateEnd?.()
          }}
          setId={onChange}
        />
        <LeaderSelectPrimitive
          {...props}
          ref={ref}
          onChange={onChange}
          options={data || []}
          onCreate={() => {
            open()
            onCreate?.()
          }}
          search={dirtySearch}
          setSearch={setDirtySearch}
          loading={isPending}
        />
      </>
    )
  }
)
