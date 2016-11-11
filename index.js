'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mailSender = require('./mailer/sender')
const mailConstructor = require('./mailer/constructor')

let router = express.Router()
let port = process.env.PORT || 3000
let mailOptions = {}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


/*
 *  It keeps setting headers more than once
 * check http://expressjs.com/en/guide/using-middleware.html
 */
router.post('/send-invitation', function (req, res, next) {
  Object.keys(req.query).length ? res.status(400).send('Non-empty query') : ''
  mailOptions.to = {'email': req.body.email, 'name': req.body.name}
  mailConstructor.createMail(mailOptions, function (error, mailCreated) {
    if (error) {
      res.status(error.status).send(error.reason)
      next()
    } else {
      mailSender.sendMail(mailCreated, function (error, mailSentInfo) {
        error ? res.send(error.message) : res.send(mailSentInfo)
        next()
      })
    }
  })
})

app.use('/mailer', router)

app.listen(port, function (error) {
  if (error) throw new Error(error)
})
