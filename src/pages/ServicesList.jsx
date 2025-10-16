import React, { useState, useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import FilterBar from '../components/FilterBar'

const MOCK = [
  { id: '1', nombre: 'Tour Peña de Bernal', tipo: 'tour', precio: 300, descripcion: 'Recorrido guiado por Peña de Bernal', image: '/placeholder.jpg' },
  { id: '2', nombre: 'Cabaña Arroyo', tipo: 'hospedaje', precio: 800, descripcion: 'Cabaña con vista al arroyo', image: '/placeholder.jpg' },
  { id: '3', nombre: 'Clase de cocina local', tipo: 'experiencia', precio: 250, descripcion: 'Aprende a cocinar platillos locales', image: '/placeholder.jpg' },
]

export default function ServicesList(){
  const [services, setServices] = useState([])
  const [filters, setFilters] = useState({ q:'', tipo:'', maxPrice:'' })

  useEffect(() => {
    setServices(MOCK)
  }, [])

  const apply = () => {
    let res = MOCK.slice()
    if (filters.q) res = res.filter(s => s.nombre.toLowerCase().includes(filters.q.toLowerCase()))
    if (filters.tipo) res = res.filter(s => s.tipo === filters.tipo)
    if (filters.maxPrice) res = res.filter(s => s.precio <= Number(filters.maxPrice))
    setServices(res)
  }

  return (
    <div>
      <h3>Servicios</h3>
      <FilterBar filters={filters} onChange={setFilters} onApply={apply} />
      <div className="row g-3">
        {services.map(s => (
          <div key={s.id} className="col-md-4">
            <ServiceCard service={s} />
          </div>
        ))}
        {services.length === 0 && <div className="col-12"><p className="text-center text-muted">No hay servicios</p></div>}
      </div>
    </div>
  )
}
