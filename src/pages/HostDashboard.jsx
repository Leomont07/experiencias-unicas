import React, { useEffect, useState, useContext } from 'react'
import BookingCard from '../components/BookingCard'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { apiRequest } from '../api/api'

export default function HostDashboard() {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) fetchBookings()
  }, [user])

  const fetchBookings = async () => {
    try {
      const data = await apiRequest(`/booking/getByHost/${user.id}`, 'GET')
      setBookings(data.bookings || [])
    } catch (err) {
      console.error('Error al cargar reservas:', err)
    }
  }

  useEffect(() => {
    if (user) fetchServices()
  }, [user])

  const fetchServices = async () => {
    try {
      const data = await apiRequest(`/service/getByUser/${user.id}`, 'GET')
      setServices(data.servicios || [])
    } catch (err) {
      console.error('Error al cargar servicios:', err)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar este servicio?')
    if (!confirmDelete) return

    try {
      setLoading(true)
      await apiRequest(`/service/remove/${id}`, 'PUT')
      alert('✅ Servicio eliminado correctamente')
      fetchServices()
    } catch (err) {
      alert('❌ Error al eliminar servicio: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleModalChange = (e) => {
    setSelectedService({ ...selectedService, [e.target.name]: e.target.value })
  }

  const handleConfirmEdit = async () => {
    try {
      setLoading(true)
      await apiRequest(`/service/edit/${selectedService.id}`, 'PUT', selectedService)
      alert('✅ Servicio actualizado correctamente')
      setShowModal(false)
      fetchServices()
    } catch (err) {
      alert('❌ Error al actualizar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Dashboard de anfitrión</h3>
        <Link to="/host/create" className="btn btn-primary">Publicar Servicio</Link>
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            Reservas
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            Mis Servicios
          </button>
        </li>
      </ul>

      {activeTab === 'bookings' && (
        <>
          <h5>Reservas recientes</h5>
          <div className="row g-3">
            {bookings.length ? bookings.map(b => (
              <div className="col-md-6" key={b.id}>
                <Link to={`/host/bookings/${b.id}`} className="text-decoration-none text-dark">
                  <BookingCard booking={b} />
                </Link>
              </div>
            )) : <div className="col-12"><p className="text-muted">No hay reservas aún</p></div>}
          </div>
        </>
      )}

      {activeTab === 'services' && (
        <>
          <h5>Mis servicios publicados</h5>
          <div className="row g-3">
            {services.length ? services.map(service => (
              <div className="col-md-6" key={service.id}>
                <div className="card p-3">
                  <h6>{service.nombre}</h6>
                  <p className="text-muted mb-1">{service.tipo}</p>
                  <p>{service.descripcion}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>${service.precio}</strong>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(service)}>
                        Editar
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(service.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )) : <div className="col-12"><p className="text-muted">No tienes servicios publicados aún</p></div>}
          </div>
        </>
      )}

      {/* 🪟 MODAL DE EDICIÓN */}
      {showModal && selectedService && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar servicio</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" name="nombre" className="form-control" value={selectedService.nombre} onChange={handleModalChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo</label>
                  <select name="tipo" className="form-select" value={selectedService.tipo} onChange={handleModalChange}>
                    <option value="tour">Tour</option>
                    <option value="hospedaje">Hospedaje</option>
                    <option value="experiencia">Experiencia</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input type="number" name="precio" className="form-control" value={selectedService.precio} onChange={handleModalChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea name="descripcion" className="form-control" rows="3" value={selectedService.descripcion} onChange={handleModalChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleConfirmEdit} disabled={loading}>
                  {loading ? 'Guardando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
