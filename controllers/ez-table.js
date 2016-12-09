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
  sendInvitation: function (req, res) {
    let mailOptions = {}
    let extras = {}
    if (!req.body.email) return res.send('No receiver')
    mailOptions.to = req.body.email
    extras.token = req.body.token
    extras.pswd = req.body.pswd
    extras.email = req.body.email

    mailConstructor.invitationMail(mailOptions, extras, function (error, mailCreated) {
      afterCreate(error, mailCreated, function (result) {
        res.send(result)
      })
    })
  },

  sendTable: function (req, res) {
    let mailOptions = {}
    let extras = {}
    if (!(req.body.email && req.body.tname && req.body.ext)) return res.status(400).send('Bad request')
    mailOptions.to = req.body.email
    extras.tableName = req.body.tname
    extras.extension = req.body.ext
    mailConstructor.shareTableMail(mailOptions, extras, function (error, mailCreated) {
      afterCreate(error, mailCreated, function (result) {
        res.send(result)
      })
    })
  }
}
