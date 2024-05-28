import React, { type FC, useContext, useState } from 'react'

import { Avatar, Center, Skeleton, Stack, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import PostService from '@/API/EmployeeService.ts'
import { GroupContext } from '@/context/GroupContext.ts'
import { Post } from '@/types/Post'
import { type SortValue } from '@/types/SortValue.ts'
import { type UserStage } from '@/types/UserStage.ts'
import { UserStageGroup } from '@/types/UserStageGroup.ts'
import { groupStages } from '@/utils/constants.ts'

import { useSortedPosts } from './hooks/usePost.tsx'
import { PostItem } from './post.item/PostItem.tsx'
import { SelectStage } from './selectStage/SelectStage.tsx'

interface PostListProps {
  stages: UserStage[]
  search: string
  sort: SortValue
}

export const PostList: FC<PostListProps> = ({ stages, search, sort }) => {
  const {
    data: posts,
    isPending,
    error,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['employees', stages, search],
    queryFn: () => PostService.get(stages, search)
  })

  const sortedPosts = useSortedPosts(posts || [], sort)

  if (sort && posts) {
    console.log(sort)
    console.log([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <Stack gap="md" py="md">
      {isPending &&
        [...Array(5)].map((_, index) => (
          <Skeleton key={index} height={88} radius="lg" />
        ))}
      {isError && (
        <Center p="xl">
          <Text size="xl" c="red">
            Произошла ошибка {error.message}
          </Text>
        </Center>
      )}
      {isSuccess &&
        sortedPosts.map((post, index) => (
          <PostItem key={post.id} index={index + 1} post={post} />
        ))}
      {isSuccess && sortedPosts.length === 0 && (
        <Stack justify="center" align="center" p="xl">
          <Avatar size={128} />
          <Text size="xl" fw={700}>
            Сотрудники не найдены
          </Text>
        </Stack>
      )}
    </Stack>
  )
}
