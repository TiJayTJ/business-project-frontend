import { useState } from 'react'
import './App.css'
import PostItem from './components/PostItem.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>Vite + React</h1>
      <PostItem post = {{title: 'Добавить сотрудника'}}/>
    </div>
  )
}

export default App
