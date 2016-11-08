const config = require('./config')

let mailOptions = {}

module.exports = {
  createMail: function (initialMailBody, callback) {
    if (!initialMailBody.to) callback(new Error('No receiver'))
    mailOptions = initialMailBody
    mailOptions.from = config.name + ' ' + '<' + config.email + '>'
    mailOptions.subject = 'Hello!'
    mailOptions.text = '!world'
    callback(null, mailOptions)
  }
}
