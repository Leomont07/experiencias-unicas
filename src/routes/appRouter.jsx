import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ServicesList from '../pages/ServicesList'
import ServiceDetail from '../pages/ServiceDetail'
import Booking from '../pages/Booking'
import HostDashboard from '../pages/HostDashboard'
import CreateService from '../pages/CreateService'
import BookingDetail from '../pages/BookingDetail'
import AdminDashboard from '../pages/AdminDashboard'
import ProtectedRoute from './protectedRoute' 
import PoliticaPrivacidad from '../pages/PoliticaProvacidad'
import TerminosCondiciones from '../pages/TerminosCondiciones'
import BookingList from '../pages/BookingList'

export default function AppRouter() {
  
  // Tipos permitidos
  const ANY = ['cualquiera']
  const TOURIST = ['turista']
  const HOST = ['anfitrion']
  const ADMIN = ['admin']
  const HOST_OR_ADMIN = ['anfitrion', 'admin']
  const LOGGED_IN = ['turista', 'anfitrion', 'admin']

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute allowedTypes={ANY}><Home /></ProtectedRoute>} />
      <Route path="/login" element={<ProtectedRoute allowedTypes={ANY}><Login /></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute allowedTypes={ANY}><Register /></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute allowedTypes={ANY}><ServicesList /></ProtectedRoute>} />
      <Route path="/services/:id" element={<ProtectedRoute allowedTypes={ANY}><ServiceDetail /></ProtectedRoute>} />
      <Route path="/politica-privacidad" element={<ProtectedRoute allowedTypes={ANY}><PoliticaPrivacidad /></ProtectedRoute>} />
      <Route path="/terminos-condiciones" element={<ProtectedRoute allowedTypes={ANY}><TerminosCondiciones /></ProtectedRoute>} />
      
      {/* RUTAS PARA TURISTAS */}
      <Route 
        path="/booking/:serviceId" 
        element={
          <ProtectedRoute allowedTypes={TOURIST}>
            <Booking />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-bookings" 
        element={
          <ProtectedRoute allowedTypes={TOURIST}>
            <BookingList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bookingDetail/:id" 
        element={
          <ProtectedRoute allowedTypes={TOURIST}>
            <BookingDetail />
          </ProtectedRoute>
        } 
      />



      {/* RUTAS PARA ANFITRIONES */}
      <Route 
        path="/host" 
        element={
          <ProtectedRoute allowedTypes={HOST}>
            <HostDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/host/create" 
        element={
          <ProtectedRoute allowedTypes={HOST}>
            <CreateService />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/host/bookings/:id" 
        element={
          <ProtectedRoute allowedTypes={HOST}>
            <BookingDetail />
          </ProtectedRoute>
        } 
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedTypes={ADMIN}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  )
}