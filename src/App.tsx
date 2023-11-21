import { useState, MouseEvent } from 'react'
import './App.css'
import { PostList } from './components/PostList'
import { MyButton } from './components/UI/button/MyButton'
import { MyInput } from './components/UI/input/MyInput'
import { PostForm } from './components/PostForm'
import { Post } from './types/Post'


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Иванов Иван Иваныч'},
    {id: 2, title: 'Иванов Иван НеИваныч'},
    {id: 3, title: 'Иванов Иван СлишкомИваныч'}])

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <PostForm create={createPost}/>
      <PostList remove={removePost} posts={posts} title='Список сотрудников'/>
    </div>
  )
}

export default App
