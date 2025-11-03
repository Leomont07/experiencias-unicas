const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Helper para obtener el token guardado en localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Método genérico para peticiones con JSON
export async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
  }

  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${API_URL}${endpoint}`, options)
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Error en la solicitud')
  return data
}
