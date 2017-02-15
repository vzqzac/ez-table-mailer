const mailConstructor = require('../mailer/constructor')
const mailSender = require('../mailer/sender')

module.exports = {
  sendInvitation: function (req, res) {
    if (!(req.body.token && req.body.email)) return res.status(400).send('Not proper data provided')
    const receiver = req.body.email
    const token = req.body.token

    const mail = mailConstructor.newInvitationMail(receiver, token)
    mailSender.sendMail(mail)
      .then(function (info) {
        res.send(info)
      })
      .catch(function (error) {
        res.status(500).send(error)
      })
  }
}
