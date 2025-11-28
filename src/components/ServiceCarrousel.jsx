import React from 'react'
import ServiceCard from './ServiceCard'

// Este componente crea un contenedor que permite desplazamiento horizontal (scrolling)
// para mostrar los ServiceCard uno al lado del otro.
const ServiceCarousel = ({ services }) => {
  if (!services || services.length === 0) {
    return <p className="text-muted">No hay elementos para mostrar en este carrusel.</p>
  }

  return (
    // Contenedor principal del carrusel: usa flexbox y permite desplazamiento horizontal
    <div 
      className="d-flex overflow-auto pb-3" 
      style={{ 
        gap: '1.5rem', // Espacio entre las tarjetas
        WebkitOverflowScrolling: 'touch', // Mejor desplazamiento en iOS
        scrollSnapType: 'x mandatory', // Opcional: Para que se detenga en cada tarjeta
      }}
    >
      {services.map(service => (
        <div 
          key={service.id} 
          // Establece un ancho fijo para que se vean solo 3 o 4 a la vez
          style={{ 
            minWidth: '300px', // Ancho de la tarjeta en el carrusel
            maxWidth: '300px',
            scrollSnapAlign: 'start' // Para el efecto de scroll-snap
          }}
        >
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  )
}

export default ServiceCarousel