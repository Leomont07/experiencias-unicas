import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function VerifyAccount() {
  const { token } = useParams()
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [status, setStatus] = useState('Verificando tu cuenta...')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setStatus('Token de verificación no encontrado.')
      setLoading(false)
      return
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify/${token}`) 
        const data = await res.json()

        if (!res.ok) throw new Error(data.message || 'Error en la verificación.')

        login({ token: data.token, user: data.user }) 
        
        setStatus('¡Cuenta verificada exitosamente! Redirigiendo...')
        
        setTimeout(() => {
          if (data.user.tipo === 'anfitrion') {
            navigate('/host')
          } else {
            navigate('/') 
          }
        }, 2000)

      } catch (err) {
        setStatus(`❌ Falló la verificación: ${err.message}`)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [token, login, navigate])


  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 text-center">
        <div className="card p-5 shadow-lg">
          <h1 className="mb-4">{loading ? '⏳' : status.startsWith('✅') ? '🎉' : '⚠️'}</h1>
          <h4>{status}</h4>
          {!loading && status.startsWith('❌') && (
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => navigate('/login')}
            >
              Ir a Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </div>
  )
}