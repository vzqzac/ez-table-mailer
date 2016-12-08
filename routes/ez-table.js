const express = require('express')
const router = express.Router()
const mailSender = require('../mailer/sender')
const mailConstructor = require('../mailer/constructor')

let mailOptions = {}
let extras = {}


router.route('/send-invitation').post(function (req, res) {
  mailOptions.to = req.body.email
  extras.token = req.body.token
  extras.pswd = req.body.pswd
  extras.email = req.body.email
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

module.exports = router
