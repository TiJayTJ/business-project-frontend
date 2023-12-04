import { FC, forwardRef, useEffect, useState } from 'react'
import {
  LeaderSelectPrimitive,
  LeaderSelectPrimitiveProps
} from './LeaderSelectPrimitive'
import { Leader } from '@/types/Leader'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { LeadersService } from '@/API/LeadersService'
import { AddLeaderModal } from '../modal/AddLeaderModal'
import { useDisclosure } from '@mantine/hooks'

interface LeaderSelectProps
  extends Omit<
    LeaderSelectPrimitiveProps,
    'options' | 'onCreate' | 'search' | 'setSearch' | 'loading'
  > {}

export const LeaderSelect = forwardRef<HTMLButtonElement, LeaderSelectProps>(
  ({ onChange, ...props }, ref) => {
    const [dirtySearch, setDirtySearch] = useState('')
    const [opened, { open, close }] = useDisclosure(false)

    const [search] = useDebounce(dirtySearch, 500)

    const { data, isPending } = useQuery({
      queryKey: ['leaders', search],
      queryFn: () => LeadersService.get(search)
    })

    return (
      <>
        <AddLeaderModal opened={opened} onClose={close} setId={onChange} />
        <LeaderSelectPrimitive
          {...props}
          ref={ref}
          onChange={onChange}
          options={data || []}
          onCreate={open}
          search={dirtySearch}
          setSearch={setDirtySearch}
          loading={isPending}
        />
      </>
    )
  }
)
