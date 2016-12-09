const express = require('express')
const router = express.Router()

module.exports = function (app) {
  const ezTable = require('./ez-table')

  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use('/ez-table', ezTable)

  app.all('/', function (req, res) {
    res.status(404).send('Not found')
  })
}
