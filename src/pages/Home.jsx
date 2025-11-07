import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { apiRequest } from '../api/api'

export default function Home() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true)
                const data = await apiRequest('/service/getAll', 'GET')
                setServices(data.servicios || []) 
            } catch (err) {
                console.error('Error al obtener servicios:', err)
                setError('No se pudieron cargar los servicios.')
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

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
            
            {loading && <p>Cargando servicios...</p>}
            {error && <p className="text-danger">{error}</p>}
            <div className="row g-3">
                {services.length > 0 ? (
                    services.map(s => (
                        <div key={s.id} className="col-md-6">
                            <ServiceCard service={s} />
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-muted">No se encontraron servicios activos.</p>
                )}
            </div>
        </div>
    )
}