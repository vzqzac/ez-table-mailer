const mailer = require('nodemailer')
const config = require('./config')

let mailOptions

const smtpConfig = {
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.email,
    pass: config.password
  }
}

let transporter = mailer.createTransport(smtpConfig)

module.exports = {
  createMail: function (startedMail, callback) {
    if (!startedMail.to) callback(new Error('No receiver'))
    mailOptions = startedMail
    mailOptions.from = config.name + ' ' + '<' + config.email + '>'
    mailOptions.subject = 'Hello!'
    mailOptions.text = '!world'
    callback(null, mailOptions)
  },

  sendMail: function (mail) {
    transporter.sendMail(mail, function (error, info) {
      if (error) console.log(error)
    })
  }
}
