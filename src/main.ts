import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { makePersonRoutes } from './routes/person-routes'
import { makeClientRoutes } from './routes/client-routes'
import { makeFeedStockRoutes } from './routes/feedstock-route'
import { makeProductRoutes } from './routes/product-routes'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const personRouter = Router()
const clientRouter = Router()
const feedstockRouter = Router()
const productRouter = Router()

makePersonRoutes(personRouter)
makeClientRoutes(clientRouter)
makeFeedStockRoutes(feedstockRouter)
makeProductRoutes(productRouter)

app.use('/person', personRouter)
app.use('/client', clientRouter)
app.use('/feedstock', feedstockRouter)
app.use('/product', productRouter)

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
