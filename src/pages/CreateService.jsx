import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import { AuthContext } from '../context/AuthContext'
import { apiRequest } from '../api/api'

export default function CreateService() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    precio: 0,
    descripcion: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const body = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        tipo: form.tipo,
        estatus: 1,
        precio: parseFloat(form.precio),
        idUsuario: user?.id || JSON.parse(localStorage.getItem('user')).id
      }

      await apiRequest('/service/add', 'POST', body)

      alert('✅ Servicio publicado con éxito')
      navigate('/host')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-4">
          <h4>Publicar servicio</h4>
          <form onSubmit={onSubmit}>
            <InputField label="Nombre del servicio" name="nombre" value={form.nombre} onChange={onChange} />

            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select className="form-select" name="tipo" value={form.tipo} onChange={onChange}>
                <option disabled value="">Seleccione una opción</option>
                <option value="alimentos">Alimentos</option>
                <option value="hospedaje">Hospedaje</option>
                <option value="experiencia">Experiencia</option>
              </select>
            </div>

            <InputField label="Precio" name="precio" type="number" value={form.precio} onChange={onChange} />

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={onChange} rows="4"></textarea>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-grid">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
