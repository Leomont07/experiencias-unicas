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

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<ServicesList />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/booking/:serviceId" element={<Booking />} />
      <Route path="/host" element={<HostDashboard />} />
      <Route path="/host/create" element={<CreateService />} />
      <Route path="/host/bookings/:id" element={<BookingDetail />} />
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  )
}
