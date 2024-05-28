import { type FC, type PropsWithChildren } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps extends PropsWithChildren {
  redirect?: string
  invert?: boolean
}

export const PrivateRoute: FC<ProtectedRouteProps> = ({
  redirect = '/login',
  invert,
  children
}) => {
  const isLoggedIn = localStorage.getItem('token') ? true : false

  if (invert ? isLoggedIn : !isLoggedIn) {
    return <Navigate to={redirect} replace />
  }

  return children ? children : <Outlet />
}
