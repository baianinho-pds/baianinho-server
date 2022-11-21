import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { makePersonRoutes } from './routes/person-routes'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const personRouter = Router()
makePersonRoutes(personRouter)

app.use('/person', personRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
