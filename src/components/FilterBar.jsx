import React from 'react'

export default function FilterBar({ filters, onChange, onApply }) {
  return (
    <div className="card p-3 mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" placeholder="Buscar..." value={filters.q || ''} onChange={(e)=>onChange({...filters, q: e.target.value})} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filters.tipo || ''} onChange={(e)=>onChange({...filters, tipo: e.target.value})}>
            <option value="">Todos los tipos</option>
            <option value="hospedaje">Hospedaje</option>
            <option value="tour">Tour</option>
            <option value="experiencia">Experiencia</option>
          </select>
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control" placeholder="Precio máximo" value={filters.maxPrice || ''} onChange={(e)=>onChange({...filters, maxPrice: e.target.value})} />
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-primary" onClick={onApply}>Aplicar</button>
        </div>
      </div>
    </div>
  )
}
