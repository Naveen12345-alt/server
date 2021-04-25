var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mqttHandler = require('./mqttHandler')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var mqttClient = new mqttHandler()
mqttClient.connect()

var server = app.listen(3002, function () {
  console.log('app running on port.', server.address().port)
})
