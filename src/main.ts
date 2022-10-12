import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { makeUserRoutes } from './routes/user-routes'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const userRouter = Router()
makeUserRoutes(userRouter)

app.use('/user', userRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
