const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mailer = require('./mailer/sender')
let router = express.Router()
let mailOptions = {}
let port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.post('/send', function (req, res) {
  console.log('wut')
  mailOptions.to = req.query.receiver
  mailer.createMail(mailOptions, function (error, success) {
    if (error) res.send('error')
    mailOptions = success
    mailer.sendMail(mailOptions)
    res.send('success')
  })
})

app.use('/mailer', router)

app.listen(port, function(error) {
  if (error) throw new Error(error)
  console.log('listen at port: ' + port)
})
