import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageCarousel from '../components/ImageCarousel'
import { apiRequest } from '../api/api'

export default function ServiceDetail() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const data = await apiRequest(`/service/getById/${id}`, 'GET')
        setService(data.servicio)
      } catch (err) {
        console.error('Error al obtener servicio:', err)
        setError('No se pudo cargar el servicio.')
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [id])

  if (loading) return <p>Cargando servicio...</p>
  if (error) return <p className="text-danger">{error}</p>
  if (!service) return <p>No se encontró el servicio</p>

  return (
    <div className="row g-4">
      <div className="col-md-7">
        <div className="card p-3">
          <ImageCarousel images={service.images || ['/placeholder.jpg']} />
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
