import { createBrowserRouter } from 'react-router-dom'

import App from '@/App'

import { Home } from './tabs/Home'
import { Stats } from './tabs/Stats'

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
