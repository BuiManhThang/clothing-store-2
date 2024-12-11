import express, { json } from 'express'
import morgan from 'morgan'
import pool from './config/database'
import config from './config'

const app = express()
const PORT = config.app.port

app.use(morgan('dev'))
app.use(json())

pool
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database')

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to database', error)
  })
