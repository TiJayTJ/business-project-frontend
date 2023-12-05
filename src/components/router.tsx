import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import App from '@/App'
import { Stats } from './pages/Stats'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/stats', element: <Stats /> }
    ]
  }
])
