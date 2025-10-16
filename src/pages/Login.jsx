import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputField from '../components/InputField'

export default function Login(){

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h4>Iniciar sesión</h4>
          <form>
            <InputField label="Email" name="email" type="email" />
            <InputField label="Contraseña" name="password" type="password" />
            <div className="d-grid">
              <button className="btn btn-primary">Entrar</button>
            </div>
          </form>
          <hr />
          <small>¿No tienes cuenta? <Link to="/register">Regístrate</Link></small>
        </div>
      </div>
    </div>
  )
}
