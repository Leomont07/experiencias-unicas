import React from 'react'
import { Link } from 'react-router-dom'

// La función getServiceDetails se mantiene sin cambios, es correcta para la lógica.
const getServiceDetails = (service) => {
    switch (service.tipo) {
        case 'hospedaje':
            if (service.subtipo === 'hotel' && service.numHabitaciones > 0) {
                return `${service.subtipo} · ${service.numHabitaciones} hab.`
            }
            if (service.subtipo && (service.numCuartos > 0 || service.numPisos > 0)) {
                return `${service.subtipo} · ${service.numCuartos} cuartos`
            }
            return `${service.subtipo || 'Hospedaje'}`
        case 'alimentos':
            if (service.cantidad > 0) {
                return `Cantidad: ${service.cantidad}`
            }
            return `Alimentos`
        case 'experiencia':
            if (service.duracionHoras > 0) {
                return `${service.duracionHoras} hrs.`
            }
            return `Experiencia`
        default:
            return service.tipo
    }
}

// Límite de caracteres para la descripción
const MAX_DESCRIPTION_LENGTH = 100 

export default function ServiceCard({ service }) {
    const details = getServiceDetails(service)
    const needsTruncation = service.descripcion?.length > MAX_DESCRIPTION_LENGTH
    
    // Texto de la descripción truncado
    const truncatedDescription = needsTruncation 
        ? service.descripcion.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
        : service.descripcion

    return (
        // CLAVE 1: Aplicar flexbox y altura fija o min-height a la tarjeta si es necesario.
        // Usaremos flexbox en el body para empujar la acción al final.
        <div className="card h-100 p-0 d-flex flex-column"> 
            
            {/* Imagen con altura fija */}
            <div style={{height:180, overflow:'hidden', borderTopLeftRadius:'0.25rem', borderTopRightRadius:'0.25rem'}}> 
                <img 
                    src={service.image || '/default.jpg'} 
                    alt={service.nombre} 
                    style={{width:'100%', height:'100%', objectFit:'cover'}} // Altura 100% de su contenedor
                />
            </div>
            
            {/* CLAVE 2: card-body con flexbox para gestionar el espacio */}
            <div className="card-body d-flex flex-column"> 
                
                {/* Título y detalles: Espacio de altura variable, pero corto */}
                <h5 className="card-title">{service.nombre}</h5>
                
                <p className="card-text text-muted mb-1">
                    {details}
                </p>
                <p className="card-text text-muted">${service.precio}</p>
                
                {/* CLAVE 3: Contenedor de descripción con altura mínima fija */}
                <div style={{ minHeight: '60px', marginBottom: '10px' }}> {/* Ajusta '60px' para 3 líneas */}
                    <p className="card-text text-secondary mb-1">
                        {truncatedDescription}
                    </p>
                    {/* Opción "Visualizar más" que lleva a la vista de detalles */}
                    {needsTruncation && (
                        <Link to={`/services/${service.id}`} className="card-link small text-primary text-decoration-none" style={{fontWeight: 500}}>
                            Ver más detalles
                        </Link>
                    )}
                </div>

                {/* Separador para empujar el botón al final */}
                <div className="mt-auto"></div> 
                
                {/* CLAVE 4: Botones alineados al fondo (gracias a mt-auto) */}
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <Link to={`/services/${service.id}`} className="btn btn-outline-primary btn-sm">Ver</Link>
                    <Link to={`/booking/${service.id}`} className="btn btn-primary btn-sm">Reservar</Link>
                </div>
            </div>
        </div>
    )
}