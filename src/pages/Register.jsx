import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'

export default function Register(){
  const navigate = useNavigate()

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h4>Registrarse</h4>
          <form>
            <InputField label="Nombre" name="nombre" />
            <InputField label="Email" name="email" type="email" />
            <InputField label="Contraseña" name="password" type="password" />
            <div className="d-grid">
              <button className="btn btn-primary">Crear cuenta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
