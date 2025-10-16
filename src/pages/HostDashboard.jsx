import React, { useEffect, useState } from 'react'
import BookingCard from '../components/BookingCard'
import { Link } from 'react-router-dom'

export default function HostDashboard(){
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const bs = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(bs.reverse())
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Dashboard de anfitrión</h3>
        <Link to="/host/create" className="btn btn-primary">Publicar Servicio</Link>
      </div>

      <h5>Reservas recientes</h5>
      <div className="row g-3">
        {bookings.length ? bookings.map(b => (
          <div className="col-md-6" key={b.id}>
            <Link to={`/host/bookings/${b.id}`} className="text-decoration-none text-dark">
              <BookingCard booking={b} />
            </Link>
          </div>
        )) : <div className="col-12"><p className="text-muted">No hay reservas aún</p></div>}
      </div>
    </div>
  )
}
