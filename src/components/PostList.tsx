import React, { FC } from 'react'
import { PostItem } from './post.item/PostItem.tsx'
import { Post } from '@/types/Post'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

interface PostListProps {
  posts: Post[]
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  if (!posts.length) {
    return <h1>Сотрудники не найдены!</h1>
  }

  return (
    <TransitionGroup>
      {posts.map((post, index) => (
        <CSSTransition key={post.id} timeout={500} classNames="post">
          <PostItem index={index + 1} post={post} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
