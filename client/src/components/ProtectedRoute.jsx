import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

ProtectedRoute.propTypes = {
  token: PropTypes.any.isRequired,
  redirectPath: PropTypes.string,
  children: PropTypes.any,
}

export default function ProtectedRoute({
  token,
  redirectPath = '/signin',
  children,
}) {
  if (!token) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
