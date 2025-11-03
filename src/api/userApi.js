import { apiRequest } from './api'

// Obtener todos los usuarios
export const getAllUsers = async () => {
  return await apiRequest('/users', 'GET')
}

// Cambiar rol
export const updateUserRole = async (id, rol) => {
  return await apiRequest('/users/role', 'PUT', { id, rol })
}

// Cambiar estatus (activar / suspender)
export const toggleUserStatus = async (id) => {
  return await apiRequest(`/users/status/${id}`, 'PUT')
}

// Eliminar usuario
export const deleteUser = async (id) => {
  return await apiRequest(`/users/${id}`, 'DELETE')
}
