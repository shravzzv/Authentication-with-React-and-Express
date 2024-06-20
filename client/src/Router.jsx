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
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || ''
  )

  const handleLogin = (newUser = { username: 'Sai Shravan' }) => {
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const handleLogout = () => {
    setUser('')
    localStorage.setItem('user', null)
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} />,
      errorElement: <Error user={user} />,
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoute user={user}>
              <Home user={user} logout={handleLogout} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/about',
          element: (
            <ProtectedRoute user={user}>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: '/signin',
          element: <SignIn user={user} login={handleLogin} />,
        },
        {
          path: '/signup',
          element: <SignUp user={user} login={handleLogin} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
