import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  ModalProps,
  Paper,
  Stack,
  Text
} from '@mantine/core'
import { MyModal } from './MyModal'
import { Post } from '@/types/Post'
import { PostInfo } from '../post.item/PostInfo'
import dayjs from 'dayjs'
import { stageName } from '@/utils/constants'
import { FC } from 'react'
import { MyButton } from '../UI/button/MyButton'
import { IconPencil } from '@tabler/icons-react'

interface EmployeeModalProps extends ModalProps {
  post: Post
}

export const EmployeeModal: FC<EmployeeModalProps> = ({
  post,
  opened,
  onClose
}) => {
  return (
    <MyModal opened={opened} onClose={onClose} title="Сотрудник">
      <Stack>
        <Paper
          component={Stack}
          align="center"
          gap={3}
          bg="dark.6"
          p="lg"
          pos="relative"
        >
          <ActionIcon
            variant="light"
            size="xl"
            radius="xl"
            pos="absolute"
            aria-label="Edit"
            top={16}
            right={16}
          >
            <IconPencil />
          </ActionIcon>

          <Avatar size="xl" />
          <Text size="lg" fw={700} mt="xs">
            {post.surname} {post.name} {post.patronymic}
          </Text>
          <Badge variant="light">{stageName[post.stage]}</Badge>
        </Paper>
        <Stack mt="md" gap="xs">
          <Text fw={700}>Основное</Text>
          <PostInfo label="Должность">{post.jobTitle}</PostInfo>
          <PostInfo label="Цель обучения">{post.trainingPurpose}</PostInfo>
        </Stack>
        <Stack mt="md" gap="xs">
          <Text fw={700}>Руководитель</Text>
          <PostInfo label="ФИО">
            {post.leader.surname} {post.leader.name} {post.leader.patronymic}
          </PostInfo>
          <PostInfo label="Должность">{post.leader.jobTitle}</PostInfo>
        </Stack>
        <Stack mt="md" gap="xs">
          <Text fw={700}>Сведения по проекту</Text>
          <PostInfo label="Название проекта">{post.project}</PostInfo>
          <PostInfo label="Дата подачи заявки">
            {dayjs(post.startTime).format('D MMMM YYYY')}
          </PostInfo>
        </Stack>
      </Stack>
    </MyModal>
  )
}
