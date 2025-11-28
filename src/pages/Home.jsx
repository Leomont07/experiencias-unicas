import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { apiRequest } from '../api/api'
import ServiceCarousel from '../components/ServiceCarrousel' // Importar el nuevo componente

export default function Home() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true)
                // Nota: Asegúrate de que el backend devuelva los servicios ordenados por fecha
                // de creación descendente (los más nuevos primero) para obtener los "últimos 6".
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

    // --- LÓGICA DE FILTRADO Y AGRUPACIÓN ---
    
    // 1. Experiencias Destacadas (Últimas 6)
    const featuredServices = services.slice(0, 6)

    // 2. Filtrado por Tipo
    const hospedajeServices = services.filter(s => s.tipo === 'hospedaje')
    const alimentosServices = services.filter(s => s.tipo === 'alimentos')
    const experienciasServices = services.filter(s => s.tipo === 'experiencia')
    
    // Si tienes otros tipos, puedes añadirlos o filtrarlos aquí.
    
    // --- RENDERIZADO DEL CONTENIDO ---

    if (loading) {
        return <div className="text-center mt-5"><p>Cargando servicios...</p></div>
    }

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>
    }

    return (
        <div>
            {/* Sección de Encabezado (sin cambios) */}
            <div className="header-hero mb-5 p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Arroyo Seco</h1>
                        <p className="lead text-muted">Conecta con anfitriones locales y reserva experiencias auténticas.</p>
                        <Link to="/services" className="btn btn-primary">Explorar Servicios</Link>
                    </div>
                    <div style={{width:360}}>
                        <div className="card p-3">
                            <h6>Resumen del MVP</h6>
                            <p className="small text-muted">Registro, Inicio de sesión, catálogo, reservas, dashboard de anfitriones y reseñas.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr/>
            
            {/* 1. CARRUSEL DE EXPERIENCIAS DESTACADAS (Últimas 6) */}
            <div className="mb-5">
                <h3 className="mb-3">Experiencias Destacadas (Lo más nuevo)</h3>
                {featuredServices.length > 0 ? (
                    <ServiceCarousel services={featuredServices} />
                ) : (
                    <p className="text-muted">No hay servicios recientes para destacar.</p>
                )}
            </div>

            {/* 2. CARRUSEL DE HOSPEDAJE */}
            <div className="mb-5">
                <h3 className="mb-3">Hospedaje</h3>
                {hospedajeServices.length > 0 ? (
                    <ServiceCarousel services={hospedajeServices} />
                ) : (
                    <p className="text-muted">No se encontraron servicios de hospedaje.</p>
                )}
            </div>

            {/* 3. CARRUSEL DE ALIMENTOS */}
            <div className="mb-5">
                <h3 className="mb-3">Alimentos</h3>
                {alimentosServices.length > 0 ? (
                    <ServiceCarousel services={alimentosServices} />
                ) : (
                    <p className="text-muted">No se encontraron servicios de alimentos.</p>
                )}
            </div>

            {/* 4. CARRUSEL DE EXPERIENCIAS */}
            <div className="mb-5">
                <h3 className="mb-3">Aventuras y Experiencias</h3>
                {experienciasServices.length > 0 ? (
                    <ServiceCarousel services={experienciasServices} />
                ) : (
                    <p className="text-muted">No se encontraron servicios de aventuras.</p>
                )}
            </div>
        </div>
    )
}