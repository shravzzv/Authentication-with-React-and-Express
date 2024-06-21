import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

Navbar.propTypes = {
  token: PropTypes.any.isRequired,
}

export default function Navbar({ token }) {
  return (
    <nav>
      <ul>
        {token ? (
          <>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/signin'>Sign In</Link>
            </li>
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
