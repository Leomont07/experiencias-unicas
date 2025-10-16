import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'

export default function Booking(){
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fecha: '', cantidad_personas: 1, comentarios: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const newBooking = {
        id: Date.now().toString(),
        serviceId,
        serviceName: 'Servicio Simulado',
        fecha: form.fecha || new Date().toISOString(),
        cantidad_personas: form.cantidad_personas,
        comentarios: form.comentarios,
        estado: 'Confirmada',
        total: 300 * (form.cantidad_personas || 1)
      }
      bookings.push(newBooking)
      localStorage.setItem('bookings', JSON.stringify(bookings))
      navigate('/host')
    }, 900)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h4>Reservar servicio</h4>
          <form onSubmit={onSubmit}>
            <InputField label="Fecha y hora" name="fecha" value={form.fecha} onChange={onChange} type="datetime-local" />
            <InputField label="Cantidad de personas" name="cantidad_personas" value={form.cantidad_personas} onChange={onChange} type="number" min="1" />
            <div className="mb-3">
              <label className="form-label">Comentarios</label>
              <textarea name="comentarios" className="form-control" rows="3" value={form.comentarios} onChange={onChange}></textarea>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" disabled={loading}>{loading ? 'Reservando...' : 'Confirmar reserva'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
