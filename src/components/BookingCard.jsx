import React from 'react'

export default function BookingCard({ booking }) {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between">
        <div>
          <h6 className="mb-1">{booking.serviceName}</h6>
          <small className="text-muted">{new Date(booking.fecha).toLocaleString()}</small>
        </div>
        <div className="text-end">
          <div>${booking.total || booking.price}</div>
          <small className="text-muted">{booking.estado || 'Pendiente'}</small>
        </div>
      </div>
    </div>
  )
}
