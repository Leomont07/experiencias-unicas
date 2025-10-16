import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageCarousel from '../components/ImageCarousel'

const MOCK = {
  id: '1',
  nombre: 'Tour Peña de Bernal',
  tipo: 'tour',
  precio: 300,
  descripcion: 'Recorrido guiado por Peña de Bernal con degustación local',
  images: ['/placeholder.jpg']
}

export default function ServiceDetail(){
  const { id } = useParams()
  const [service, setService] = useState(null)

  useEffect(() => {
    setService(MOCK)
  }, [id])

  if (!service) return <div>Cargando...</div>

  return (
    <div className="row g-4">
      <div className="col-md-7">
        <div className="card p-3">
          <ImageCarousel images={service.images} />
          <div className="mt-3">
            <h3>{service.nombre}</h3>
            <p className="text-muted">{service.tipo} · ${service.precio}</p>
            <p>{service.descripcion}</p>
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="card p-3">
          <h5>Reservar</h5>
          <p><strong>Precio:</strong> ${service.precio}</p>
          <div className="d-grid">
            <Link to={`/booking/${service.id}`} className="btn btn-primary">Iniciar reserva</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
