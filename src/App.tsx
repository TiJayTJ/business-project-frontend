import { useEffect, useMemo, useState } from 'react'
import { PostList } from './components/PostList'
import { PostForm } from './components/PostForm'
import { PostFilter } from './components/PostFilter'

import { Post } from './types/Post'
import { SortValue } from './types/SortValue'
import { MyModal } from './components/modal/MyModal'


import '@mantine/core/styles.css';
import './App.css'

import { MyButton } from './components/UI/button/MyButton'
import { usePosts } from './components/hooks/usePost'
import PostService from './API/PostService'
import { useFetching } from './components/hooks/useFetching'
import { MantineProvider } from '@mantine/core'


function App() {
  const [posts, setPosts] = useState<Post[]>([
    {id: 1, surname: 'Шальнев', name: 'Владислав', patronymic: 'Александрович' },
    {id: 2, surname: 'Тахавиев', name: 'Нурхан', patronymic: 'Булатович', },
    {id: 3, surname: 'Береснёв', name: 'Руслан', patronymic: 'Анатольевич', }])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort as SortValue, filter.query)
  const {
    fetch: fetchPosts,
    isLoading: isPostsLoading,
    error: postError
  } = useFetching( async () => {
    const posts = await PostService.getAll()
    console.log(posts)
  })


  useEffect (() => {
    fetchPosts();
  }, [])

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <MantineProvider defaultColorScheme='dark' theme={{
      primaryColor: 'violet'
    }}>
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
        {postError &&
          <h1>Произошла ошибка ${postError}</h1> 
        }
        {isPostsLoading
        ? <h1>Идёт загрузка........</h1>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список сотрудников'/>}
        
      </div>
    </MantineProvider>
  )
}

export default App
