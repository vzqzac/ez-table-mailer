const express = require('express')
const router = express.Router()
const mailController = require('../controllers/ondecode')

router.route('/contact')
  .post(function (req, res) {
    mailController.sendInfo(req, res)
  })

module.exports = router
