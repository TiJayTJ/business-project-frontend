import React, { type FC, useContext } from 'react'

import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Paper,
  Stack,
  Text
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCheck, IconX } from '@tabler/icons-react'

import { GroupContext } from '@/context/GroupContext'
import { ModalContext } from '@/context/ModalContext'
import { type Post } from '@/types/Post'
import { UserStage } from '@/types/UserStage'
import { UserStageGroup } from '@/types/UserStageGroup'
import { stageColor, stageName } from '@/utils/constants'

import { ApplicationControls } from '../application.controls/ApplicationControls'
import { ExamControls } from '../application.controls/ExamControls'
import { PracticeControls } from '../application.controls/PracticeControls'
import { SendToProdControls } from '../application.controls/SendToProdControls'
import { StudyControls } from '../application.controls/StudyControls'
import { ResultFormPopover } from '../entrance.test.controls/ResultFormPopover'
import { EmployeeModal } from '../modal/EmployeeModal'
import styles from './PostItem.module.css'

interface PostItemProps {
  index: number
  post: Post
}

export const PostItem: FC<PostItemProps> = ({ index, post }) => {
  const group = useContext(GroupContext)
  const open = useContext(ModalContext)

  const applicationStage =
    group === UserStageGroup.APPLICATION &&
    post.stage === UserStage.WAITING_APPLICATION_TRAINING

  const entranceStage =
    group === UserStageGroup.ENTRANCE_TEST &&
    post.stage === UserStage.PASSES_ENTRANCE_TEST

  const examStage =
    group === UserStageGroup.EXAM && post.stage !== UserStage.GRADUATED

  const expectsPractice =
    group === UserStageGroup.PRODUCTION_PRACTICE &&
    post.stage === UserStage.EXPECTS_PRODUCTION_PRACTICE

  const practiceStage =
    group === UserStageGroup.PRODUCTION_PRACTICE &&
    post.stage === UserStage.PRODUCTION_PRACTICE

  const studyingStage =
    group === UserStageGroup.STUDYING && post.stage === UserStage.STUDYING

  return (
    <>
      <Paper
        p={0}
        component="button"
        radius="lg"
        withBorder
        w="100%"
        className={styles.root}
        pr="lg"
        display="flex"
      >
        <Group
          p="md"
          mr="md"
          align="flex-start"
          onClick={() => open(post.id)}
          className={styles.inner}
        >
          <Avatar size="lg" />
          <Stack gap="xs" align="flex-start">
            <Text>
              {post.surname} {post.name} {post.patronymic}
            </Text>
            <Badge variant="light" color={stageColor[post.stage]}>
              {stageName[post.stage]}
            </Badge>
          </Stack>
        </Group>
        {applicationStage && <ApplicationControls id={post.id} />}
        {entranceStage && <ResultFormPopover id={post.id} />}
        {examStage && <ExamControls id={post.id} stage={post.stage} />}
        {expectsPractice && <SendToProdControls id={post.id} />}
        {practiceStage && <PracticeControls id={post.id} />}
        {studyingStage && <StudyControls id={post.id} />}
      </Paper>
    </>
  )
}
