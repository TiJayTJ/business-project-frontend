import { useMemo, useState } from 'react'
import './App.css'
import { PostList } from './components/PostList'
import { PostForm } from './components/PostForm'
import { MySelect } from './components/UI/select/MySelect'
import { MyInput } from './components/UI/input/MyInput'
import { Post } from './types/Post'
import { SortValue } from './types/SortValue'



function App() {
  const [posts, setPosts] = useState<Post[]>([
    {id: 1, surname: 'Шальнев', name: 'Владислав', patronymic: 'Александрович' },
    {id: 2, surname: 'Тахавиев', name: 'Нурхан', patronymic: 'Булатович', },
    {id: 3, surname: 'Береснёв', name: 'Руслан', patronymic: 'Анатольевич', }])

  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const sortedPosts = useMemo( () => {
    console.log('отработала функция')
    if(selectedSort) {
      return [...posts].sort((a , b) => a[selectedSort as SortValue].localeCompare(b[selectedSort as SortValue]))
    }
    return posts;
  }, [selectedSort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => 
      post.surname.toLowerCase().includes(searchQuery) ||
      post.name.toLowerCase().includes(searchQuery) ||
      post.patronymic.toLowerCase().includes(searchQuery)
    )
  }, [searchQuery, sortedPosts])

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post: Post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort: keyof Post) => {
    setSelectedSort(sort)
  }

  return (
    <div className='App'>
      <PostForm create={createPost}/>
      <hr/>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          type="txt"
          placeholder='Поиск...'
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Сортировка'
          options={[
            {value: 'surname', name: 'По фамилии'},
            {value: 'name', name: 'По имени'},
            {value: 'patronymic', name: 'По отчеству'},
        ]}/>
      </div>
      {sortedAndSearchedPosts.length !== 0
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список сотрудников'/>
        : <h1>Сотрудники не найдены!</h1>
      }
    </div>
  )
}

export default App
