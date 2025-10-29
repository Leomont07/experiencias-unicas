import express from 'express'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

// Conexión Supabase
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Rutas
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
