import express from 'express'
import { config } from 'dotenv'
import authRoutes from './Routes/auth.routes.js'

config()
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Wellcome to Realtime-Chat-App API!'))
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))