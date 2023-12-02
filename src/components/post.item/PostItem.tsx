import React, { FC } from 'react'
import { Post } from '@/types/Post'
import { Avatar, Badge, Group, Paper, Stack, Text } from '@mantine/core'
import { stageName } from '@/utils/constants'
import { useDisclosure } from '@mantine/hooks'
import styles from './PostItem.module.css'
import { EmployeeModal } from '../modal/EmployeeModal'

interface PostItemProps {
  index: number
  post: Post
}

export const PostItem: FC<PostItemProps> = ({ index, post }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <EmployeeModal opened={opened} close={close} post={post} />
      <Paper
        component="button"
        mt="md"
        radius="lg"
        withBorder
        onClick={open}
        w="100%"
        className={styles.root}
      >
        <Group p="md" align="flex-start">
          <Avatar size="lg" />
          <Stack gap="xs">
            <Text>
              {post.surname} {post.name} {post.patronymic}
            </Text>
            <Badge variant="light">{stageName[post.stage]}</Badge>
          </Stack>
        </Group>
      </Paper>
    </>
  )
}
