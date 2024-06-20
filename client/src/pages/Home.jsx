import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

Home.propTypes = {
  user: PropTypes.any.isRequired,
  logout: PropTypes.func.isRequired,
}

export default function Home({ user, logout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  return (
    <>
      <h1>Authentication with React and Express.</h1>
      <p>Hello {user?.username}.</p>
      <p>You are now logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
