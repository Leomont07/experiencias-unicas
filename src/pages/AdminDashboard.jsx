import React, { useEffect, useState, useContext } from 'react'
import { apiRequest } from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function AdminDashboard() {
  const { user } = useContext(AuthContext)
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.rol === 'admin') {
      fetchUsuarios()
    }
  }, [user])

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const data = await apiRequest('/users', 'GET')
      setUsuarios(data.usuarios || [])
    } catch (err) {
      console.error('Error al cargar usuarios:', err)
      alert('Error al obtener usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleChangeRol = async (id, nuevoRol) => {
    try {
      setLoading(true)
      await apiRequest('/users/role', 'PUT', { id, rol: nuevoRol })
      alert('Rol actualizado correctamente')
      fetchUsuarios()
    } catch (err) {
      alert('Error al cambiar rol: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleEstatus = async (id) => {
    try {
      setLoading(true)
      await apiRequest(`/users/status/${id}`, 'PUT')
      alert('Estatus actualizado')
      fetchUsuarios()
    } catch (err) {
      alert('Error al actualizar estatus: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return
    try {
      setLoading(true)
      await apiRequest(`/users/${id}`, 'DELETE')
      alert('Usuario eliminado correctamente')
      fetchUsuarios()
    } catch (err) {
      alert('Error al eliminar usuario: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !usuarios.length) {
    return <p className="text-center mt-4">Cargando usuarios...</p>
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Panel de Administración 👑</h3>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length ? usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={u.rol}
                    onChange={e => handleChangeRol(u.id, e.target.value)}
                  >
                    <option value="visitante">Visitante</option>
                    <option value="anfitrion">Anfitrión</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <span className={`badge ${u.estatus ? 'bg-success' : 'bg-secondary'}`}>
                    {u.estatus ? 'Activo' : 'Suspendido'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => handleToggleEstatus(u.id)}
                  >
                    {u.estatus ? 'Suspender' : 'Activar'}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
