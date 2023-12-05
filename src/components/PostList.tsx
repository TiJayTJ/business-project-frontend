import React, { FC, useContext, useState } from 'react'
import { PostItem } from './post.item/PostItem.tsx'
import { Post } from '@/types/Post'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useQuery } from '@tanstack/react-query'
import { UserStageGroup } from '@/types/UserStageGroup.ts'
import PostService from '@/API/EmployeeService.ts'
import { groupStages } from '@/utils/constants.ts'
import { GroupContext } from '@/context/GroupContext.ts'
import { Avatar, Center, Skeleton, Stack, Text } from '@mantine/core'
import { SelectStage } from './selectStage/SelectStage.tsx'
import { UserStage } from '@/types/UserStage.ts'
import { useSortedPosts } from './hooks/usePost.tsx'
import { SortValue } from '@/types/SortValue.ts'

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
