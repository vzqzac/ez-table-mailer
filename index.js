'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mailSender = require('./mailer/sender')
const mailConstructor = require('./mailer/constructor')

let router = express.Router()
let port = process.env.PORT || 3000
let mailOptions = {}
let extras = {}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.post('/send-invitation', function (req, res) {
  mailOptions.to = req.body.email
  extras.token = req.body.token
  extras.pswd = req.body.pswd
  mailConstructor.createMail(mailOptions, extras, function (error, mailCreated) {
    if (error) {
      res.send(error.message)
    } else {
      mailSender.sendMail(mailCreated).then(function (mailSentInfo) {
        if (mailSentInfo) res.send(mailSentInfo)
      }).catch(function (err) {
        if (err) res.send(err.message)
      })
    }
  })
})

app.use('/mailer', router)

app.listen(port, function (error) {
  if (error) throw new Error(error)
})
