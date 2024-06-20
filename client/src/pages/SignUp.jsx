import PropTypes from 'prop-types'
import { useNavigate, Navigate } from 'react-router-dom'

SignUp.propTypes = {
  user: PropTypes.any.isRequired,
  login: PropTypes.func.isRequired,
}

export default function SignUp({ user, login }) {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
    navigate('/')
  }

  if (user) {
    return <Navigate to={'/'} replace />
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='formControl'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='john doe'
          />
        </div>

        <div className='formControl'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
