import React from 'react'

import axios from 'axios'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <RouterProvider router={router} /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
