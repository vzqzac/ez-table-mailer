const config = require('./config')
/*
 * NOTE: To be used for templates but not yet
 */
// const fs = require('fs')
// const path = require('path')

let mailOptions = {}

function commonMail (initialMailBody, subject) {
  if (typeof initialMailBody.to === 'object') {
    initialMailBody.bcc = initialMailBody.to
    delete initialMailBody.to
  }
  mailOptions = initialMailBody
  mailOptions.from = config.name + ' <' + config.email + '>'
  mailOptions.subject = subject
}

module.exports = {
  invitationMail: function (initialMailBody, extras, callback) {
    mailOptions = {}
    commonMail(initialMailBody, 'Your invitation to join ez-table!')

    mailOptions.html = "<a href='https://ez-table.com/#/join/" + extras.token + '/' + extras.email + "'>join</a><br>p: " + extras.pswd
    return callback(null, mailOptions)
  },

  shareTableMail: function (initialMailBody, extras, callback) {
    mailOptions = {}
    commonMail(initialMailBody, config.name + ' shared a table with you!')
    mailOptions.attachments = [
      {filename: extras.tableName + '.' + extras.extension, path: 'https://s3-us-west-2.amazonaws.com/ez-table/' + extras.tableName}
    ]
    mailOptions.html = "Test attachment"
    return callback(null, mailOptions)
  }
}
