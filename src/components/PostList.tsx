import React, { FC } from 'react'
import { PostItem } from './PostItem.tsx';
import { Post } from '@/types/Post';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface PostListProps{
    remove: (post: Post) => void
    posts: Post[]
    title: string
}

export const PostList: FC<PostListProps> = ({remove, posts, title}) => {
    if(!posts.length) {
        return (
            <h1>Сотрудники не найдены!</h1>
        )
    }
    
    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) => 
                <CSSTransition
                key={post.id}
                timeout={500}
                classNames="post"
              >
                <PostItem remove={remove} index={index+1} post={post}/>
              </CSSTransition>
              )}   
            </TransitionGroup>
        </div>
    );
}