const config = require('./config')
const fs = require('fs')
const path = require('path')

let mailOptions = {}

module.exports = {
  createMail: function (initialMailBody, extras, callback) {
    if (!initialMailBody.to) return callback(new Error('No receiver'))
    if (typeof initialMailBody.to === 'object') {
      initialMailBody.bcc = initialMailBody.to
      delete initialMailBody.to
    }
    mailOptions = initialMailBody
    mailOptions.from = config.name + ' ' + '<' + config.email + '>'
    mailOptions.subject = 'Your invitation to join ez-table!'

    mailOptions.html = "<a href='https://ez-table.com/#/join/" + extras.token + '/' + extras.email + "'>join</a><br>p: " + extras.pswd
    return callback(null, mailOptions)
  }
}
