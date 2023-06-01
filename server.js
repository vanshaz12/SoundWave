const express = require('express')
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/session')




const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

const app = express()
const port = process.env.PORT || 3001























app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)


