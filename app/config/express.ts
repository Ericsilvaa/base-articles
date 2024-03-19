import { config } from 'dotenv'
config()
// import connection from '@database/connection'
import express, { Express } from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'

// Routes
import routes from '@routes/index.routes'
import path from 'path'

export default (): Express => {
  const app = express()

  app.set('port', process.env.PORT || 3000)
  app.use(express.static('public'))
  app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
  )
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors())
  // connection()
  // Initialize routes
  app.use('/api/v1', routes)

  return app
}
