import React, { FC } from 'react'
import { PostItem } from './PostItem.tsx';
import { Post } from '@/types/Post';

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
            {posts.map((post, index) => 
                <PostItem remove={remove} index={index+1} post={post} key={post.id}/>)}   {/* ToDo: заменить key с index на id */}
        </div>
    );
}