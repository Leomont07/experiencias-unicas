import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-white mt-4 py-4 border-top">
      <div className="container text-center">
        
        <div className="mb-2">
          <Link to="/politica-privacidad" className="text-muted small mx-2 text-decoration-none">
            Política de Privacidad
          </Link>
          <span className="text-muted small">|</span>
          <Link to="/terminos-condiciones" className="text-muted small mx-2 text-decoration-none">
            Términos y Condiciones
          </Link>
        </div>
        
        <small>© {new Date().getFullYear()} Arroyo Seco — Experiencias locales.</small>
      </div>
    </footer>
  )
}