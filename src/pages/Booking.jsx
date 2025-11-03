import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import { apiRequest } from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function Booking() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [form, setForm] = useState({ fecha: '', cantidad: 1, comentarios: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {

      await apiRequest('/booking/add', 'POST', {
        idUsuario: user?.id || JSON.parse(localStorage.getItem('user')).id,
        idService: serviceId,
        estatus: 'Confirmada',
        cantidad: Number(form.cantidad),
        comentarios: form.comentarios,
        fecha: form.fecha || new Date().toISOString()
      })

      alert('Reserva creada exitosamente ✅')
      navigate('/host')
    } catch (err) {
      console.error('Error al crear reserva:', err)
      setError('No se pudo crear la reserva.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h4>Reservar servicio</h4>
          {error && <p className="text-danger">{error}</p>}

          <form onSubmit={onSubmit}>
            <InputField
              label="Fecha y hora"
              name="fecha"
              value={form.fecha}
              onChange={onChange}
              type="datetime-local"
            />
            <InputField
              label="Cantidad"
              name="cantidad"
              value={form.cantidad}
              onChange={onChange}
              type="number"
              min="1"
            />

            <div className="mb-3">
              <label className="form-label">Comentarios</label>
              <textarea
                name="comentarios"
                className="form-control"
                rows="3"
                value={form.comentarios}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? 'Reservando...' : 'Confirmar reserva'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
