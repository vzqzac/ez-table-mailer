const config = require('./config')
const fs = require('fs')
const path = require('path')

let mailOptions = {}

module.exports = {
  createMail: function (initialMailBody, callback) {
    !initialMailBody.to.email
      ? callback({reason: new Error('No email specified'), status: 400})
      : !initialMailBody.to.name
      ? callback({reason: new Error('No name specified'), status: 400})
      : ''
    mailOptions = initialMailBody
    mailOptions.from = config.name + ' ' + '<' + config.email + '>'
    mailOptions.subject = 'Your invitation to join ez-table!'
    mailOptions.html = fs.readFileSync(path.join(__dirname, 'emailTemplates', 'invitation.html'), 'utf8')
    callback(null, mailOptions)
  }
}
