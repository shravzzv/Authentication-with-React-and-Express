import { useEffect, useState } from 'react'
import axios from 'axios'

export default function About() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const token = JSON.parse(localStorage.getItem('token'))
        const res = await axios.get('http://localhost:3000/users', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        if (res.status === 200) setUsers(res.data)
      } catch (error) {
        setError(error.response.data.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <>
        <p>OOPS! An error occured.</p>
        <p>{error}</p>
      </>
    )
  }

  return (
    <>
      <h1>About us</h1>
      <p>Members:</p>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </>
  )
}
