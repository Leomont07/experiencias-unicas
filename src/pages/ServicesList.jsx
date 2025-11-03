import React, { useState, useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import FilterBar from '../components/FilterBar'
import { apiRequest } from '../api/api'

export default function ServicesList() {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [filters, setFilters] = useState({ q: '', tipo: '', maxPrice: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const data = await apiRequest('/service/getAll', 'GET')
        setServices(data.servicios)
      } catch (err) {
        console.error('Error al cargar servicios:', err)
        setError('No se pudieron cargar los servicios.')
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const apply = () => {
    let res = [...services]
    if (filters.q) {
      res = res.filter(s => s.nombre.toLowerCase().includes(filters.q.toLowerCase()))
    }
    if (filters.tipo) {
      res = res.filter(s => s.tipo === filters.tipo)
    }
    if (filters.maxPrice) {
      res = res.filter(s => s.precio <= Number(filters.maxPrice))
    }
    setFilteredServices(res)
  }

  if (loading) return <p>Cargando servicios...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div>
      <h3>Servicios disponibles</h3>
      <FilterBar filters={filters} onChange={setFilters} onApply={apply} />

      <div className="row g-3 mt-3">
        {filteredServices.length > 0 ? (
          filteredServices.map(s => (
            <div key={s.id} className="col-md-4">
              <ServiceCard service={s} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">No hay servicios disponibles</p>
          </div>
        )}
      </div>
    </div>
  )
}
