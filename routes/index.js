const express = require('express')
const router = express.Router()

const ezTable = require('./ez-table')
const ondecode = require('./ondecode')
const inlete = require('./inlete')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use('/ez-table', ezTable)
  app.use('/inlete', inlete)
  app.use('/', ondecode)

}
