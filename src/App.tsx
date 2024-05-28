import { useEffect } from 'react'

import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'

import { PrivateRoute } from './PrivateRoute'
import AuthorizationPage from './pages/AuthorizationPage'
import RegisteredHome from './pages/RegisteredPage'

const Callback = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) return

    localStorage.setItem('token', code)
  }, [])

  return <Navigate to="/" replace />
}

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <RegisteredHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PrivateRoute redirect="/" invert>
            <AuthorizationPage />
          </PrivateRoute>
        }
      />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  )
}

export default App
