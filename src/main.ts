import express, { Router } from 'express'
import { makeUserRoutes } from './routes/user-routes'

const app = express()

const userRouter = Router()
makeUserRoutes(userRouter)

app.use('/user', userRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
