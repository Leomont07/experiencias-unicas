import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api/api'

export default function BookingList() {
    const [bookings, setBookings] = useState([])
    const [filteredBookings, setFilteredBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const [filterTipo, setFilterTipo] = useState('')
    const [filterNombre, setFilterNombre] = useState('')
    const [filterFecha, setFilterFecha] = useState('')

    useEffect(() => {
        const fetchBookings = async () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (!user?.id) {
                setError('Error: ID de usuario no encontrado.')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const data = await apiRequest(`/booking/getByUser/${user.id}`, 'GET')
                setBookings(data.reservas || [])
                setFilteredBookings(data.reservas || [])
            } catch (err) {
                setError('Error al cargar las reservas.')
                console.error('Error al cargar reservas:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [])
    
    useEffect(() => {
        let currentFiltered = bookings

        if (filterTipo) {
            currentFiltered = currentFiltered.filter(b => b.service?.tipo === filterTipo)
        }

        if (filterNombre) {
            const searchLower = filterNombre.toLowerCase()
            currentFiltered = currentFiltered.filter(b => 
                b.service?.nombre?.toLowerCase().includes(searchLower)
            )
        }

        if (filterFecha) {
            currentFiltered = currentFiltered.filter(b => 
                b.fechaInicio?.startsWith(filterFecha)
            )
        }

        setFilteredBookings(currentFiltered)
    }, [bookings, filterTipo, filterNombre, filterFecha])

    if (loading) return <p>Cargando tus reservas...</p>
    if (error) return <p className="alert alert-danger">{error}</p>

    return (
        <div>
            <h3 className="mb-4">Mis Reservas</h3>

            <div className="card p-3 mb-4">
                <h6 className="mb-3">Filtrar Reservas</h6>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Tipo de Servicio</label>
                        <select 
                            className="form-select" 
                            value={filterTipo} 
                            onChange={(e) => setFilterTipo(e.target.value)}
                        >
                            <option value="">Todos los tipos</option>
                            <option value="alimentos">Alimentos</option>
                            <option value="hospedaje">Hospedaje</option>
                            <option value="experiencia">Experiencia</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Nombre del Servicio</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Buscar por nombre..."
                            value={filterNombre} 
                            onChange={(e) => setFilterNombre(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Fecha de Inicio</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={filterFecha} 
                            onChange={(e) => setFilterFecha(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            
            {filteredBookings.length === 0 && bookings.length > 0 && (
                <p className="text-info">No hay reservas que coincidan con los filtros aplicados.</p>
            )}

            {filteredBookings.length === 0 && bookings.length === 0 && (
                <p className="text-muted">Aún no tienes reservas confirmadas.</p>
            )}

            <div className="row g-3">
                {filteredBookings.map(b => (
                    <div className="col-md-6" key={b.id}>
                        <div className="card p-3">
                            <h5 className="card-title">{b.service.nombre}</h5>
                            {b.service.tipo === 'hospedaje' ? (
                                <p className="card-text text-muted mb-1">
                                    {b.service.tipo} 
                                    {b.numNoches ? ` (${b.numNoches} noches)` : ''}
                                </p>
                            ) : (
                                <p className="card-text text-muted mb-1">{b.service.tipo}</p>
                            )}
                            
                            <p className="card-text">
                                Fecha: {new Date(b.fechaInicio).toLocaleDateString()}
                                {b.fechaFin && ` - ${new Date(b.fechaFin).toLocaleDateString()}`}
                            </p>
                            <p>
                                Total: ${b.total} | Cantidad: {b.cantidad}
                            </p>
                            <Link to={`/bookingDetail/${b.id}`} className="btn btn-sm btn-outline-info">Ver Detalles</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}