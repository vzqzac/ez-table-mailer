const express = require('express')
const router = express.Router()
const mailController = require('../controllers/ez-table')

router.route('/send-invitation')
  .post(mailController.sendInvitation)

router.route('/share-table')
  .post(mailController.sendTable)

module.exports = router
