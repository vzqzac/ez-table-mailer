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
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

router.post('/send-invitation', function (req, res) {
  mailOptions.to = req.query.receiver
  mailConstructor.createMail(mailOptions, function (error, mailCreated) {
    if (error) {
      res.send(error.message)
    } else {
      mailSender.sendMail(mailCreated, function (error, mailSentInfo) {
        error ? res.send(error.message) : res.send(mailSentInfo)
      })
    }
  })
})

app.use('/mailer', router)

app.listen(port, function (error) {
  if (error) throw new Error(error)
})
