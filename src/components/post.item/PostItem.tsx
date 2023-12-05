import React, { FC, useContext } from 'react'
import { Post } from '@/types/Post'
import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Paper,
  Stack,
  Text
} from '@mantine/core'
import { stageColor, stageName } from '@/utils/constants'
import { useDisclosure } from '@mantine/hooks'
import styles from './PostItem.module.css'
import { EmployeeModal } from '../modal/EmployeeModal'
import { IconCheck, IconX } from '@tabler/icons-react'
import { GroupContext } from '@/context/GroupContext'
import { UserStageGroup } from '@/types/UserStageGroup'
import { ModalContext } from '@/context/ModalContext'
import { ApplicationControls } from '../application.controls/ApplicationControls'
import { UserStage } from '@/types/UserStage'
import { ResultFormPopover } from '../entrance.test.controls/ResultFormPopover'
import { ExamControls } from '../application.controls/ExamControls'

import { SendToProdControls } from '../application.controls/SendToProdControls'
import { PracticeControls } from '../application.controls/PracticeControls'
import { StudyControls } from '../application.controls/StudyControls'

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
