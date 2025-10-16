import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Arroyo Seco</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/services">Servicios</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-primary" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/register">Registrarse</Link>
                </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
