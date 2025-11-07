import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

/**
 * @param {string[]} allowedTypes
 * @param {React.ReactNode} children 
 */

export default function ProtectedRoute({ allowedTypes = [], children }) {
  const { user } = useContext(AuthContext)
  
  const isPublic = allowedTypes.includes('cualquiera')
  
  if (isPublic) {
    return children
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const isAuthorized = allowedTypes.includes(user.tipo)

  if (!isAuthorized) {
    alert("Acceso denegado. Tipo de usuario no autorizado.")
    return <Navigate to="/" replace />
  }

  return children
}