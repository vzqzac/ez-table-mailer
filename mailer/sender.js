const mailer = require('nodemailer')
const config = require('./config')

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
  sendMail: function (mailCreated, callback) {
    transporter.sendMail(mailCreated).then(info => callback(null, info)).catch(err => callback(err))
  }
}
