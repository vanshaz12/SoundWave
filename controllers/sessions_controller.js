const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/', (req, res) => {
  const { email, password } = req.body

  User
    .findByEmail(email)
    .then(user => {
      const isValidPassword = bcrypt.compareSync(password, user.password_digest)

      if (user && isValidPassword) {
        req.session.userId = user.id
        res.json({ email: user.email })
      }
    })
})

router.get('/', (req, res) => {
    const userId = req.session.userId
    if (userId) {
      User
        .findById(userId)
        .then(email => res.json({ result: 'successful', email: email }))
    } else {
      res.json({})
    }
  })

module.exports = router 