import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {user && user.tipo === 'anfitrion' ? (
          <Link className="navbar-brand" to="/host">Experiencias Únicas</Link>
        ) : (
          <Link className="navbar-brand" to="/">Experiencias Únicas</Link>
        )}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            {user && user.tipo === 'turista' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">Servicios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-bookings">Mis Reservas</Link>
                </li>
              </>
            )}
            {/* Solo visible si es admin */}
            {user?.tipo === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Panel Admin</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            {!user ? (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-primary" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/register">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <span className="me-3">Hola, {user.nombre}</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
