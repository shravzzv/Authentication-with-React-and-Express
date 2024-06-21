import PropTypes from 'prop-types'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'

SignIn.propTypes = {
  token: PropTypes.any.isRequired,
  updateToken: PropTypes.func.isRequired,
}

export default function SignIn({ token, updateToken }) {
  const [data, setData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/signin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const token = res.data.token
      updateToken(token)
      localStorage.setItem('token', JSON.stringify(token))
      navigate('/')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  if (token) {
    return <Navigate to={'/'} replace />
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className='formControl'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='john doe'
            value={data.username}
            onChange={handleChange}
          />
          {errors && errors.find((error) => error.path === 'username') && (
            <span>{errors.find((error) => error.path === 'username').msg}</span>
          )}
        </div>

        <div className='formControl'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={data.password}
            onChange={handleChange}
          />
          {errors && errors.find((error) => error.path === 'password') && (
            <span>{errors.find((error) => error.path === 'password').msg}</span>
          )}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
