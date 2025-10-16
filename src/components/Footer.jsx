import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white mt-4 py-4 border-top">
      <div className="container text-center">
        <small>© {new Date().getFullYear()} Arroyo Seco — Experiencias locales.</small>
      </div>
    </footer>
  )
}
