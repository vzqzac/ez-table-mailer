const mailSender = require('../mailer/sender')
const mailConstructor = require('../mailer/constructor')

function afterCreate (error, mailCreated, callback) {
  if (error) return callback(error.message)
  mailSender.sendMail(mailCreated).then(function (mailSentInfo) {
    if (mailSentInfo) callback(mailSentInfo)
  }).catch(function (err) {
    if (err) callback(err.message)
  })
}

module.exports = {
  sendInfo: function (req, res) {
    let mailOptions = {}
    let extras = {}
    mailOptions.to = 'info@ondecode.com'
    extras.email = req.body.email
    extras.phone = req.body.phone
    extras.message = req.body.message
    extras.name = req.body.name

    mailConstructor.infoMail(mailOptions, extras, function (error, mailCreated) {
      afterCreate(error, mailCreated, function (result) {
        res.send(result)
      })
    })
  }
}
