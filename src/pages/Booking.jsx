import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import { apiRequest } from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function Booking() {
    const { serviceId } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [form, setForm] = useState({ 
        fechaInicio: '',
        fechaFin: '',
        cantidad: 1,
        numNoches: 1,
        comentarios: '' 
    })

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await apiRequest(`/service/getById/${serviceId}`, 'GET')
                setService(data.servicio)
            } catch (err) {
                console.error('Error al obtener servicio:', err)
                setError('No se pudo cargar la información del servicio.')
            } finally {
                setLoading(false)
            }
        }
        fetchService()
    }, [serviceId])

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        const baseBody = {
            idUsuario: user?.id || JSON.parse(localStorage.getItem('user')).id,
            idService: serviceId,
            estatus: 'Confirmada',
            comentarios: form.comentarios,
            fechaInicio: form.fechaInicio || new Date().toISOString()
        }
        
        let dynamicBody = {}
        
        if (service.tipo === 'hospedaje') {
            dynamicBody = {
                fechaFin: form.fechaFin,
                numNoches: Number(form.numNoches),
                cantidad: Number(form.cantidad),
            }
        } else if (service.tipo === 'alimentos') {
            dynamicBody = {
                cantidad: Number(form.cantidad),
            }
        } else if (service.tipo === 'experiencia') {
            dynamicBody = {
                cantidad: Number(form.cantidad),
            }
        }

        try {
            await apiRequest('/booking/add', 'POST', {
                ...baseBody,
                ...dynamicBody
            })

            alert('Reserva creada exitosamente ✅')
            navigate('/my-bookings')
        } catch (err) {
            console.error('Error al crear reserva:', err)
            setError('No se pudo crear la reserva. ' + err.message)
        } finally {
            setLoading(false)
        }
    }
    
    if (loading) return <p>Cargando servicio para reservar...</p>
    if (error) return <p className="text-danger">{error}</p>
    if (!service) return <p>No se encontró el servicio para reservar.</p>

    const SpecificBookingFields = () => {
        if (service.tipo === 'hospedaje') {
            return (
                <>
                    <InputField
                        label="Fecha de Check-in"
                        name="fechaInicio"
                        value={form.fechaInicio}
                        onChange={onChange}
                        type="datetime-local"
                        required
                    />
                    <InputField
                        label="Número de Noches"
                        name="numNoches"
                        value={form.numNoches}
                        onChange={onChange}
                        type="number"
                        min="1"
                        required
                    />
                    <InputField
                        label="Cantidad de Personas"
                        name="cantidad"
                        value={form.cantidad}
                        onChange={onChange}
                        type="number"
                        min="1"
                        required
                    />
                </>
            )
        } 
        
        if (service.tipo === 'alimentos') {
            return (
                <>
                    <InputField
                        label="Fecha y hora"
                        name="fechaInicio"
                        value={form.fechaInicio}
                        onChange={onChange}
                        type="datetime-local"
                        required
                    />
                    <InputField
                        label="Cantidad"
                        name="cantidad"
                        value={form.cantidad}
                        onChange={onChange}
                        type="number"
                        min="1"
                        required
                    />
                </>
            )
        }

        if (service.tipo === 'experiencia') {
            return (
                <>
                    <InputField
                        label="Fecha y hora"
                        name="fechaInicio"
                        value={form.fechaInicio}
                        onChange={onChange}
                        type="datetime-local"
                        required
                    />
                    <InputField
                        label="Número de Personas"
                        name="cantidad"
                        value={form.cantidad}
                        onChange={onChange}
                        type="number"
                        min="1"
                        required
                    />
                </>
            )
        }

        return null
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card p-4">
                    <h4>Reservar {service.nombre} ({service.tipo})</h4>
                    <p className="text-muted">Precio (unidad): ${service.precio}</p>
                    {error && <p className="text-danger">{error}</p>}

                    <form onSubmit={onSubmit}>
                        
                        <SpecificBookingFields />

                        <div className="mb-3">
                            <label className="form-label">Comentarios</label>
                            <textarea
                                name="comentarios"
                                className="form-control"
                                rows="3"
                                value={form.comentarios}
                                onChange={onChange}
                            ></textarea>
                        </div>

                        <div className="d-grid">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? 'Reservando...' : 'Confirmar reserva'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}