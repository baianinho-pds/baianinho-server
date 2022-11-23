import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { makePersonRoutes } from './routes/person-routes'
import { makeClientRoutes } from './routes/client-routes'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const personRouter = Router()
const clientRouter = Router()

makePersonRoutes(personRouter)
makeClientRoutes(clientRouter)

app.use('/person', personRouter)
app.use('/client', clientRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
