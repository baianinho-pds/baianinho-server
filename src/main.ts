import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { makePersonRoutes } from './routes/person-routes'
import { makeClientRoutes } from './routes/client-routes'
import { makeFeedStockRoutes } from './routes/feedstock-route'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const personRouter = Router()
const clientRouter = Router()
const feedstockRouter = Router()

makePersonRoutes(personRouter)
makeClientRoutes(clientRouter)
makeFeedStockRoutes(feedstockRouter)

app.use('/person', personRouter)
app.use('/client', clientRouter)
app.use('/feedstock', feedstockRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
