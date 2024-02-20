import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
// app.use('/', routerName)

// catch-all
app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    data: {
      resource: 'not found'
    }
  })
})

export default app
