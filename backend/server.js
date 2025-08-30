import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors())

// connect to db

app.get('/', (req,res) => {
    res.send(`Hello fromServer`)
})

const port = process.env.PORT




app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
})