import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { ConnectDb } from './config/db.js'
import authRoute from './routes/authRoute.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())

// connect to db

ConnectDb()



const port = process.env.PORT

app.use("/api/auth", authRoute)


app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
})