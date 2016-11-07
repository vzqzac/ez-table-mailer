const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.use(function (request, response, next) {
  next()
})

router.post('/send', function (req, res) {
  let mailOptions = {}
  mailOptions.to = req.params.receiver
})

app.use('/mailer', router)
