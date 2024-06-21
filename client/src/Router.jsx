import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import Layout from './Layout'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Error from './pages/Error'
import ProtectedRoute from './components/ProtectedRoute'

export default function Router() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token')) || ''
  )

  const handleLogout = () => {
    setToken('')
    localStorage.setItem('token', null)
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout token={token} />,
      errorElement: <Error token={token} />,
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoute token={token}>
              <Home logout={handleLogout} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/about',
          element: (
            <ProtectedRoute token={token}>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: '/signin',
          element: <SignIn token={token} updateToken={setToken} />,
        },
        {
          path: '/signup',
          element: <SignUp token={token} updateToken={setToken} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
