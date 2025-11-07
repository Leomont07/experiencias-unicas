import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', tipo: 'turista' })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // 'tipo' se incluye aquí automáticamente
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Error al registrar')

      login({ token: data.token, user: data.user })

      if (data.user.tipo === 'anfitrion') {
        navigate('/host')
        return
      }

      navigate('/') 
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h4>Registrarse</h4>
          <form onSubmit={handleSubmit}>
            <InputField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <InputField label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} />

            <div className="mb-3">
              <label htmlFor="tipo" className="form-label">Tipo de Usuario</label>
              <select
                id="tipo"
                name="tipo"
                className="form-select"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="turista">Turista</option>
                <option value="anfitrion">Anfitrión</option>
              </select>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Crear cuenta</button>
            </div>
          </form>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}