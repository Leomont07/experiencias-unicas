import React from 'react'

export default function ImageCarousel({ images = [] }) {
  if (!images || images.length === 0) {
    images = ['/placeholder.jpg']
  }
  return (
    <div id="serviceCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((src, i) => (
          <div key={i} className={`carousel-item ${i===0 ? 'active' : ''}`}>
            <img src={src} className="d-block w-100" alt={`img-${i}`} style={{height:300, objectFit:'cover'}}/>
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className="carousel-control-prev" type="button" data-bs-target="#serviceCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#serviceCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </>
      )}
    </div>
  )
}
