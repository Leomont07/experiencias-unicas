import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' })
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
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Error al registrar')

      // Guardar token y redirigir
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/') // Redirige al home o dashboard
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
