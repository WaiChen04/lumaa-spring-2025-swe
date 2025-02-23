const express = require('express')
const app = express()
const cors = require('cors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const tasksRouter = require('./controllers/tasks')
const authRouter = require('./controllers/auth')

app.use(express.json())
app.use(cors());
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)
app.use('/auth', authRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
 
}

start()