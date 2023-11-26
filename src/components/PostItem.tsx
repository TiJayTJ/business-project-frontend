import React, { FC } from 'react';
import { Post } from '@/types/Post';
import { MyButton } from './UI/button/MyButton';


interface PostItemProps {
  remove: (post: Post) => void
  index: number
  post: Post
}

export const PostItem: FC<PostItemProps> = ({index, post, remove}) => {
    return (
      <div className='post'>
        <div className='post_txt'>
          <h2>{index} {post.surname} {post.name} {post.patronymic}</h2>
        </div>
        <div>
          <MyButton color='red' onClick={() => remove(post)}>Удалить</MyButton>
        </div>
      </div>
    );
};