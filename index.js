const express = require('express')
const app = express()
const mqttHandler = require('./mqttHandler')

const mqttClient = new mqttHandler()

const server = app.listen(3002, function () {
  console.log('app running on port.', server.address().port)
  mqttClient.connect()
})
