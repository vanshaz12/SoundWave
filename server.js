const express = require('express')
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/session')

const app = express()
const port = process.env.PORT || 3001


