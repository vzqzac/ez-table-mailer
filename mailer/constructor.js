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
   if (Object.keys(extras).length) {
    mailOptions.html = "<a href='https://ez-table.com/#/join/" + extras.token + '/' + extras.email +
     "'>join</a><br>Please enter with your email and this password: " + extras.pswd +
     "<br>And change it once you enter"
  } else {
    mailOptions.html = "<a href='https://ez-table.com/#/'>Join</a>"
  }
    return callback(null, mailOptions)
  },

  shareTableMail: function (initialMailBody, extras, callback) {
    mailOptions = {}
    commonMail(initialMailBody, config.name + ' shared ' + extras.tableName + ' table with you!')
    // path must be changed in the future
    mailOptions.attachments = [
      {filename: extras.tableName + '.' + extras.extension, path: 'https://s3-us-west-2.amazonaws.com/ez-table/' + extras.tableName}
    ]
    mailOptions.html = "The table file is attached, you can download it by clicking it"
    return callback(null, mailOptions)
  },

  infoMail: function (initialMailBody, extras, callback) {
    mailOptions = {}
    commonMail(initialMailBody, (extras.name ? extras.name : 'Somebody') + ' wants to contact ONDECODE')
    mailOptions.html =
      '<div> What ' + (extras.name ? extras.name : 'somebody') +
      ' said: ' + (extras.message ? extras.message : 'Nothing -.-') +
      '<br>The email: ' + (extras.email ? extras.email : 'Not provided pff') +
      "<br>Provided a phone? Let's see: " + (extras.phone ? extras.phone : 'No') +
      '</div>'
    return callback(null, mailOptions)
  }
}
