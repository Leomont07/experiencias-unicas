import e from 'express'
import { supabase } from '../index.js'

export const add = async (req, res) => {
  try {
    const { idUsuario, idService, estatus, cantidad, comentarios, fecha } = req.body

    if (!idUsuario || !idService || !estatus || !cantidad || !fecha) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios'})
    }

    const { data: servicio, error: serviceError } = await supabase
      .from('service')
      .select('precio')
      .eq('id', idService)
      .single()

    if (serviceError || !servicio) {
      throw new Error('No se pudo obtener el precio del servicio')
    }

    const total = servicio.precio * (cantidad || 1)

    // Insertar reserva nueva
    const { data, error } = await supabase
      .from('booking')
      .insert([{ idUsuario, idService, estatus, cantidad, comentarios, total, fecha }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({ booking: data })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const remove = async (req, res) => {
    const { id } = req.params

    try {
        const { error } = await supabase
        .from('booking')
        .delete()
        .eq('id', id)

        if (error) throw error
        res.json({ message: 'Reserva eliminada correctamente' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params
        const { data, error } = await supabase
            .from('booking')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error

        res.status(200).json({ booking: data })
        console.log(data)

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

export const getBookingsByUserId = async (req, res) => {
    try {
        const { idUsuario } = req.params
        const { data, error } = await supabase
            .from('booking')
            .select('*')
            .eq('idUsuario', idUsuario)
            .eq('estatus', 1)
            
        if (error) throw error

        res.status(200).json({ servicios: data })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getBookingsByHostId = async (req, res) => {
  try {
    const { idHost } = req.params

    const { data: services, error: serviceError } = await supabase
      .from('service')
      .select('id')
      .eq('idUsuario', idHost)
      .eq('estatus', 1)

    if (serviceError) throw serviceError

    if (!services.length) {
      return res.status(200).json({ bookings: [] })
    }

    const serviceIds = services.map(s => s.id)

    const { data: bookings, error: bookingError } = await supabase
    .from('booking')
    .select(`
      id,
      idUsuario,
      idService,
      estatus,
      cantidad,
      comentarios,
      total,
      fecha,
      service:service (
        nombre
      )
    `)
    .in('idService', serviceIds)
    .in('estatus', ['Pendiente', 'Confirmada'])

    if (bookingError) throw bookingError

    res.status(200).json({ bookings })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
