import { ActionIcon, Container, Group, Tabs } from '@mantine/core'

import { IconUserPlus } from '@tabler/icons-react'
import { PostFilter } from '../PostFilter'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import PostService from '@/API/PostService'
import { groupColor, groupName } from '@/utils/constants'
import { UserStageGroup } from '@/types/UserStageGroup'
import styles from './StageChip.module.css'
import { PostList } from '../PostList'
import { useQuery } from '@tanstack/react-query'
import { AddModal } from '../modal/AddModal'
import { UserStage } from '@/types/UserStage'

export const Home = () => {
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Container>
      <AddModal opened={opened} onClose={close} />
      <Group wrap="nowrap" mt="lg">
        <ActionIcon size="xl" radius="md" aria-label="Settings" onClick={open}>
          <IconUserPlus />
        </ActionIcon>
        <PostFilter filter={filter} setFilter={setFilter} />
      </Group>
      <Tabs
        mt="md"
        variant="pills"
        radius="md"
        defaultValue={UserStageGroup.ALL}
        keepMounted={false}
      >
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
        {Object.keys(UserStageGroup).map((group) => (
          <Tabs.Panel key={group} value={group as UserStageGroup}>
            <PostList group={group as UserStageGroup} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  )
}
