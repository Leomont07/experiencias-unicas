import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import { AuthContext } from '../context/AuthContext'
import { apiRequest } from '../api/api'

export default function CreateService() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [form, setForm] = useState({
    nombre: '',
    
    tipo: '',
    precio: 0,
    descripcion: ''
  })

  const [detalles, setDetalles] = useState({
    hospedaje: {
      subtipo: '',
      numHabitaciones: 0,
      numCuartos: 0,
      numPisos: 0,
    },
    alimentos: {
      cantidad: 0,
    },
    experiencia: {
      duracionHoras: 0,
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onChangeDetalle = (tipoServicio, e) => {
    setDetalles({
      ...detalles,
      [tipoServicio]: {
        ...detalles[tipoServicio],
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 🆕 Se agrega el objeto de detalles relevante al payload
      const detallesAdicionales = form.tipo === 'hospedaje' ? detalles.hospedaje
        : form.tipo === 'alimentos' ? detalles.alimentos
          : form.tipo === 'experiencia' ? detalles.experiencia
            : {}

      const body = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        tipo: form.tipo,
        estatus: 1,
        precio: parseFloat(form.precio),
        idUsuario: user?.id || JSON.parse(localStorage.getItem('user')).id,
        ...detallesAdicionales 
      }

      await apiRequest('/service/add', 'POST', body)

      alert('✅ Servicio publicado con éxito')
      navigate('/host')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const HospedajeFields = () => (
    <>
      <div className="mb-3">
        <label className="form-label">Subtipo de Hospedaje</label>
        <select
          className="form-select"
          name="subtipo"
          value={detalles.hospedaje.subtipo}
          onChange={(e) => onChangeDetalle('hospedaje', e)}
          required
        >
          <option disabled value="">Seleccione el tipo de lugar</option>
          <option value="hotel">Hotel</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
        </select>
      </div>
      
      {detalles.hospedaje.subtipo === 'hotel' && (
        <InputField 
          label="Número de Habitaciones" 
          name="numHabitaciones" 
          type="number" 
          value={detalles.hospedaje.numHabitaciones} 
          onChange={(e) => onChangeDetalle('hospedaje', e)} 
          min="1"
        />
      )}
      
      {(detalles.hospedaje.subtipo === 'casa' || detalles.hospedaje.subtipo === 'departamento') && (
        <>
          <InputField 
            label="Número de Cuartos" 
            name="numCuartos" 
            type="number" 
            value={detalles.hospedaje.numCuartos} 
            onChange={(e) => onChangeDetalle('hospedaje', e)} 
            min="1"
          />
          <InputField 
            label="Número de Pisos" 
            name="numPisos" 
            type="number" 
            value={detalles.hospedaje.numPisos} 
            onChange={(e) => onChangeDetalle('hospedaje', e)} 
            min="1"
          />
        </>
      )}
    </>
  )

  const AlimentosFields = () => (
    <>
      <InputField 
        label="Cantidad" 
        name="cantidad" 
        type='number'
        value={detalles.alimentos.cantidad} 
        onChange={(e) => onChangeDetalle('alimentos', e)}
      />
    </>
  )

  const ExperienciaFields = () => (
    <>
      <InputField 
        label="Duración (en horas)" 
        name="duracionHoras" 
        type="number" 
        value={detalles.experiencia.duracionHoras} 
        onChange={(e) => onChangeDetalle('experiencia', e)} 
        step="0.5"
        min="0.5"
      />
    </>
  )

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-4">
          <h4>Publicar servicio</h4>
          <form onSubmit={onSubmit}>
            <InputField label="Nombre del servicio" name="nombre" value={form.nombre} onChange={onChange} />

            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select className="form-select" name="tipo" value={form.tipo} onChange={onChange} required>
                <option disabled value="">Seleccione una opción</option>
                <option value="alimentos">Alimentos</option>
                <option value="hospedaje">Hospedaje</option>
                <option value="experiencia">Experiencia</option>
              </select>
            </div>
            
            {form.tipo === 'hospedaje' && <HospedajeFields />}
            {form.tipo === 'alimentos' && <AlimentosFields />}
            {form.tipo === 'experiencia' && <ExperienciaFields />}

            <InputField label="Precio" name="precio" type="number" value={form.precio} onChange={onChange} min="0" />

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={onChange} rows="4" required></textarea>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-grid">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}