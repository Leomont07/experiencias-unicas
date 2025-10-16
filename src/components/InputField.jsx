import React from 'react'

export default function InputField({ label, value, onChange, type='text', name, placeholder, ...rest }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="form-control" {...rest} />
    </div>
  )
}
