import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

ProtectedRoute.propTypes = {
  user: PropTypes.any.isRequired,
  redirectPath: PropTypes.string,
  children: PropTypes.any,
}

export default function ProtectedRoute({
  user,
  redirectPath = '/signin',
  children,
}) {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
