import { config } from 'dotenv'
config()
// import connection from '@database/connection'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Routes
import routes from '@routes/index.routes'

export default (): Express => {
  const app = express()

  app.set('port', process.env.PORT || 3000)
  app.use(express.static('public'))
  app.use(bodyParser.json())
  app.use(cors())
  // connection()
  // Initialize routes
  app.use('/api/v1', routes)

  return app
}
