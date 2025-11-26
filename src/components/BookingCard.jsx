import React from 'react'

export default function BookingCard({ booking }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between">
        <div>
          <h6 className="mb-1">{booking.service.nombre}</h6>
          <small className="text-muted">{new Date(booking.fechaInicio).toLocaleString()}</small><br />
          <small className="text-muted">{booking.comentarios}</small>
        </div>
        <div className="text-end">
          <div>${booking.total || booking.price}</div>
          <small className="text-muted">{booking.estatus}</small>
        </div>
      </div>
    </div>
  )
}
