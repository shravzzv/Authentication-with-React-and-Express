import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Error() {
  return (
    <>
      <Navbar />
      <h1>404</h1>
      <p>OOPS. There is nothing to see here.</p>
      <Link to='/'>Go back to home.</Link>
    </>
  )
}
