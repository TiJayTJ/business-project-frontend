import React, { useState, MouseEvent, FC } from 'react'
import { MyInput } from './UI/input/MyInput';
import { MyButton } from './UI/button/MyButton';
import { Post } from '@/types/Post';

interface PostFormProps{
    create: (newPost: Post) => void
}

export const PostForm: FC<PostFormProps> = ({create}) => {
    const [post, setPost] = useState({lastName: '', name: '', patronymic: ''})

    const addNewPost = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newPost = {id: Date.now(), title: `${post.lastName} ${post.name} ${post.patronymic}`}
        create(newPost)
        setPost({lastName: '', name: '', patronymic: ''})
    }
    
    return (
        <form>
        <MyInput 
          value={post.lastName} 
          onChange = {e => setPost({...post, lastName: e.target.value})}
          type="txt"
          placeholder='Фамилия'
        />
        <MyInput
          value={post.name} 
          onChange = {e => setPost({...post, name: e.target.value})}
          type="txt" 
          placeholder='Имя'/>
        <MyInput 
          value={post.patronymic} 
          onChange = {e => setPost({...post, patronymic: e.target.value})}
          type="txt" 
          placeholder='Отчество'/>
        <MyButton onClick={addNewPost}>Добавить сотрудника</MyButton>
      </form>
    );
}