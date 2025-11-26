import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiRequest } from '../api/api'

export default function BookingDetail(){
  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  const fetchBooking = async () => {
    try {
      const data = await apiRequest(`/booking/getById/${id}`, 'GET')
      setBooking(data.booking)
    } catch (err) {
      console.error('Error al cargar servicios:', err)
    }
  }

  useEffect(() => {
    fetchBooking()
  }, [])

  if (!booking) return <div>Reserva no encontrada</div>

  return (
    <div className="card p-4">
      <h4>Detalle de reserva</h4>
      <p><strong>Fecha:</strong> {new Date(booking.fechaInicio).toLocaleString()}</p>
      <p><strong>Personas:</strong> {booking.cantidad}</p>
      <p><strong>Comentarios:</strong> {booking.comentarios || "No hay comentarios"}</p>
      <p><strong>Estado:</strong> {booking.estatus}</p>
      <p><strong>Total:</strong> ${booking.total}</p>
    </div>
  )
}
