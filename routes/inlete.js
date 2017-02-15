const router = require('express').Router()
const inleteController = require('../controllers/inlete')

router.route('/send-invitation')
  .post(inleteController.sendInvitation)

module.exports = router
