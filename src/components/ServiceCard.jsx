import React from 'react'
import { Link } from 'react-router-dom'

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
                return `🍽️ Cantidad: ${service.cantidad}`
            }
            return `Alimentos`
        case 'experiencia':
            if (service.duracionHoras > 0) {
                return `${service.duracionHoras} hrs.`
            }
            return `✨ Experiencia`
        default:
            return service.tipo
    }
}

export default function ServiceCard({ service }) {
    const details = getServiceDetails(service)

    return (
        <div className="card p-0">
            <div style={{height:180, overflow:'hidden', borderTopLeftRadius:12, borderTopRightRadius:12}}>
                <img src={service.image || '/default.jpg'} alt={service.nombre} style={{width:'100%', objectFit:'cover'}} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{service.nombre}</h5>
                
                <p className="card-text text-muted mb-1">
                    {details}
                </p>
                <p className="card-text text-muted">${service.precio}</p>

                <p className="card-text" style={{minHeight: '42px'}}>{service.descripcion?.slice(0,100)}{service.descripcion?.length>100 && '...'}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/services/${service.id}`} className="btn btn-outline-primary btn-sm">Ver</Link>
                    <Link to={`/booking/${service.id}`} className="btn btn-primary btn-sm">Reservar</Link>
                </div>
            </div>
        </div>
    )
}