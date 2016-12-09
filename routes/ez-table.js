const express = require('express')
const router = express.Router()
const mailController = require('../controllers/ez-table')

router.route('/send-invitation')
  .post(function (req, res) {
    mailController.sendInvitation(req, res)
  })

router.route('/share-table')
  .post(function (req, res) {
    mailController.sendTable(req, res)
  })

module.exports = router
