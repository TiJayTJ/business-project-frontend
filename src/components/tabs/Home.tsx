import { useEffect, useState } from 'react'

import { ActionIcon, Container, Group, Tabs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUserPlus } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

import PostService from '@/API/EmployeeService'
import { GroupContext } from '@/context/GroupContext'
import { ModalContext } from '@/context/ModalContext'
import { type SortValue } from '@/types/SortValue'
import { type UserStage } from '@/types/UserStage'
import { UserStageGroup } from '@/types/UserStageGroup'
import { groupColor, groupName, groupStages } from '@/utils/constants'

import { PostFilter } from '../PostFilter'
import { PostList } from '../PostList'
import { LeaderSelect } from '../leader.select'
import { AddModal } from '../modal/AddModal'
import { EmployeeModal } from '../modal/EmployeeModal'
import { SelectStage } from '../selectStage/SelectStage'
import styles from './StageChip.module.css'

export const Home = () => {
  const [filter, setFilter] = useState({ sort: null as SortValue, query: '' })
  const [opened, { open, close }] = useDisclosure(false)
  const [employeeOpened, { open: employeeOpen, close: employeeClose }] =
    useDisclosure(false)

  const [id, setId] = useState<number | null>(null)

  const [search] = useDebounce(filter.query, 500)

  const [group, setGroup] = useState<UserStageGroup>(UserStageGroup.ALL)

  const [stage, setStage] = useState<UserStage | null>(null)

  return (
    <Container>
      <AddModal opened={opened} onClose={close} />
      <EmployeeModal
        opened={employeeOpened}
        onClose={() => {
          employeeClose()
          setId(null)
        }}
        id={id}
      />
      <Group wrap="nowrap" mt="lg">
        <ActionIcon size="xl" radius="md" aria-label="Settings" onClick={open}>
          <IconUserPlus />
        </ActionIcon>
        <PostFilter filter={filter} setFilter={setFilter} />
      </Group>
      <Tabs
        value={group}
        onChange={(value) => {
          if (!value) return

          setGroup(value as UserStageGroup)
          setStage(null)
        }}
        mt="md"
        variant="pills"
        radius="md"
        keepMounted={false}
      >
        <Group justify="space-between">
          <Tabs.List>
            {Object.keys(UserStageGroup).map((item) => {
              const group = item as UserStageGroup
              const color = groupColor[group]
              const name = groupName[group]

              return (
                <Tabs.Tab
                  key={group}
                  value={group}
                  classNames={styles}
                  style={{
                    '--tab-bg': `var(--mantine-color-${color}-light)`,
                    '--tab-color': `var(--mantine-color-${color}-light-color)`
                  }}
                >
                  {name}
                </Tabs.Tab>
              )
            })}
          </Tabs.List>
          <SelectStage
            value={stage}
            onChange={setStage}
            options={
              group !== UserStageGroup.ALL ? groupStages[group] : undefined
            }
            nullable
            miw="20%"
          />
        </Group>
        <ModalContext.Provider
          value={(id: number) => {
            employeeOpen()
            setId(id)
          }}
        >
          {(Object.keys(UserStageGroup) as UserStageGroup[]).map((group) => (
            <GroupContext.Provider key={group} value={group}>
              <Tabs.Panel value={group}>
                <PostList
                  stages={stage ? [stage] : groupStages[group]}
                  search={search}
                  sort={filter.sort}
                />
              </Tabs.Panel>
            </GroupContext.Provider>
          ))}
        </ModalContext.Provider>
      </Tabs>
    </Container>
  )
}
