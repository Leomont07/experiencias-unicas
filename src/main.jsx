import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// 🚀 REGISTRO DEL SERVICE WORKER PARA LA PWA
// Esto debe ir después de que la aplicación de React se haya montado o justo después de la llamada a root.render.

if ('serviceWorker' in navigator) {
  // Se usa 'load' para asegurar que todos los recursos iniciales se han cargado.
  // Sin embargo, para PWA, a veces se prefiere 'DOMContentLoaded' o ejecutarlo inmediatamente.
  // Lo dejaremos ejecutándose al cargar la ventana para mayor compatibilidad.
  window.addEventListener('load', () => {
    // Asegúrate de que '/sw.js' es la ruta correcta de tu Service Worker
    navigator.serviceWorker.register('/sw.js') 
      .then(registration => {
        console.log('Service Worker registrado con éxito. Scope:', registration.scope);
      })
      .catch(error => {
        console.log('Fallo el registro del Service Worker:', error);
      });
  });
}