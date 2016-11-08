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

router.post('/send-invitation', function (req, res) {
  let data = {}
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
