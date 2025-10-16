import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookingDetail(){
  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const b = bookings.find(x => x.id === id)
    setBooking(b)
  }, [id])

  if (!booking) return <div>Reserva no encontrada</div>

  return (
    <div className="card p-4">
      <h4>Detalle de reserva</h4>
      <p><strong>Servicio:</strong> {booking.serviceName}</p>
      <p><strong>Fecha:</strong> {new Date(booking.fecha).toLocaleString()}</p>
      <p><strong>Personas:</strong> {booking.cantidad_personas}</p>
      <p><strong>Comentarios:</strong> {booking.comentarios}</p>
      <p><strong>Estado:</strong> {booking.estado}</p>
      <p><strong>Total:</strong> ${booking.total}</p>
    </div>
  )
}
