import express from 'express'
import { config } from 'dotenv'
import authRoutes from './Routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import cookieParser from 'cookie-parser'

config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json()) // to parse the incoming request with json payloads ( from req.body )
app.use(cookieParser()) // to parse the incoming request with cookie ( from req.cookie )

app.get('/', (req, res) => res.send('Wellcome to Realtime-Chat-App API!'))
app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server listening on port ${PORT}!`)
})