import React, { FC } from 'react'
import { PostItem } from './post.item/PostItem.tsx'
import { Post } from '@/types/Post'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useQuery } from '@tanstack/react-query'
import { UserStageGroup } from '@/types/UserStageGroup.ts'
import PostService from '@/API/PostService.ts'
import { groupStages } from '@/utils/constants.ts'

interface PostListProps {
  group: UserStageGroup
}

export const PostList: FC<PostListProps> = ({ group }) => {
  const {
    data: posts,
    isPending,
    error,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['employees', [groupStages[group]]],
    queryFn: () => PostService.getPosts(groupStages[group])
  })

  return (
    <>
      {isPending && <h1>Идёт загрузка........</h1>}
      {isError && <h1>Произошла ошибка ${error.message}</h1>}
      {isSuccess && (
        <TransitionGroup>
          {posts.map((post, index) => (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <PostItem index={index + 1} post={post} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </>
  )
}
