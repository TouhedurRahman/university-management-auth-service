import express, { Application, Request, Response } from 'express'
import usersRouter from './app/modules/users/users.route'
import cors from 'cors'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('api/v1/users/', usersRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Working successfully')
})

export default app
