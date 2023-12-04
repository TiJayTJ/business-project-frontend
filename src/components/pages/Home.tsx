import { ActionIcon, Container, Group, Tabs } from '@mantine/core'

import { IconUserPlus } from '@tabler/icons-react'
import { PostFilter } from '../PostFilter'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'

import PostService from '@/API/EmployeeService'
import { groupColor, groupName, groupStages } from '@/utils/constants'
import { UserStageGroup } from '@/types/UserStageGroup'
import styles from './StageChip.module.css'
import { PostList } from '../PostList'
import { useQuery } from '@tanstack/react-query'
import { AddModal } from '../modal/AddModal'
import { UserStage } from '@/types/UserStage'
import { GroupContext } from '@/context/GroupContext'
import { EmployeeModal } from '../modal/EmployeeModal'
import { ModalContext } from '@/context/ModalContext'
import { useDebounce } from 'use-debounce'
import { SelectStage } from '../selectStage/SelectStage'
import { SortValue } from '@/types/SortValue'
import { LeaderSelect } from '../leader.select'

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
