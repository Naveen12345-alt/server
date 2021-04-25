var express = require('express')
var app = express()
var mqttHandler = require('./mqttHandler')

var mqttClient = new mqttHandler()
mqttClient.connect()

var server = app.listen(3002, function () {
  console.log('app running on port.', server.address().port)
})
