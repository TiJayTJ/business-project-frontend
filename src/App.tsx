import { useMemo, useState } from 'react'
import { PostList } from './components/PostList'
import { PostForm } from './components/PostForm'
import { PostFilter } from './components/PostFilter'

import { Post } from './types/Post'
import { SortValue } from './types/SortValue'
import { MyModal } from './components/modal/MyModal'

import './App.css'
import { MyButton } from './components/UI/button/MyButton'
import { usePosts } from './components/hooks/usePost'
import axios from 'axios'


function App() {
  const [posts, setPosts] = useState<Post[]>([
    {id: 1, surname: 'Шальнев', name: 'Владислав', patronymic: 'Александрович' },
    {id: 2, surname: 'Тахавиев', name: 'Нурхан', patronymic: 'Булатович', },
    {id: 3, surname: 'Береснёв', name: 'Руслан', patronymic: 'Анатольевич', }])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort as SortValue, filter.query)
  

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts() {
    const response = await axios.get('http://localhost:8080/employees?page=0&size=20&sort=asc')
    console.log(response.data)
  }

  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <button onClick={fetchPosts}>Get posts</button>
      <MyButton onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible = {modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список сотрудников'/>
      
    </div>
  )
}

export default App
