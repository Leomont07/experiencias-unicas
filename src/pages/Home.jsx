import React from 'react'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'

const mockServices = [
  { id: '1', nombre: 'Tour Peña de Bernal', tipo: 'tour', precio: 300, descripcion: 'Recorrido guiado por Peña de Bernal con degustación local', image: '../placeholder.jpg' },
  { id: '2', nombre: 'Hospedaje Arroyo', tipo: 'hospedaje', precio: 800, descripcion: 'Cabaña tranquila cerca del arroyo', image: '../placeholder.jpg' }
]

export default function Home(){
  return (
    <div>
      <div className="header-hero mb-4 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Arroyo Seco</h1>
            <p className="lead text-muted">Conecta con anfitriones locales y reserva experiencias auténticas.</p>
            <Link to="/services" className="btn btn-primary">Explorar Servicios</Link>
          </div>
          <div style={{width:360}}>
            <div className="card p-3">
              <h6>Resumen del MVP</h6>
              <p className="small text-muted">Registro, catálogo, reservas, pagos simulados, dashboard de anfitriones y reseñas.</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mb-3">Experiencias destacadas</h4>
      <div className="row g-3">
        {mockServices.map(s => (
          <div key={s.id} className="col-md-6">
            <ServiceCard service={s} />
          </div>
        ))}
      </div>
    </div>
  )
}
