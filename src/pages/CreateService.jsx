import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'

export default function CreateService(){
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre:'', tipo:'tour', precio:0, descripcion:'', images: '' })

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault()
    const services = JSON.parse(localStorage.getItem('services') || '[]')
    const newService = { id: Date.now().toString(), ...form, images: form.images ? form.images.split(',').map(s=>s.trim()) : ['/placeholder.jpg'] }
    services.push(newService)
    localStorage.setItem('services', JSON.stringify(services))
    navigate('/host')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-4">
          <h4>Publicar servicio</h4>
          <form onSubmit={onSubmit}>
            <InputField label="Nombre del servicio" name="nombre" value={form.nombre} onChange={onChange} />
            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <select className="form-select" name="tipo" value={form.tipo} onChange={onChange}>
                <option value="tour">Tour</option>
                <option value="hospedaje">Hospedaje</option>
                <option value="experiencia">Experiencia</option>
              </select>
            </div>
            <InputField label="Precio" name="precio" type="number" value={form.precio} onChange={onChange} />
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={onChange} rows="4"></textarea>
            </div>
            <InputField label="Imágenes (URLs separadas por coma)" name="images" value={form.images} onChange={onChange} />
            <div className="d-grid">
              <button className="btn btn-primary">Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
