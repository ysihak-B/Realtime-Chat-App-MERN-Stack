import express from 'express'
import { config } from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'

config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json()) // to parse the incoming request with json payloads ( from req.body )

app.get('/', (req, res) => res.send('Wellcome to Realtime-Chat-App API!'))
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server listening on port ${PORT}!`)
})