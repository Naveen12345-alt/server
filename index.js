const mqtt = require('mqtt')
const data = require('./data/Directions_from_Delhi_to_Gurgaon_Haryana.json')
let count = 0
const client = mqtt.connect('mqtt://broker.hivemq.com', {
  clientId: 'mqttjs01#gameit',
  keepAlive: 1800000,
  cleanSession: false,
})

// message
let message = JSON.stringify(data.features[0].geometry.coordinates[count])
const topic = 'testtopic/aplha'

//handle incoming messages
client.on('message', function (topic, message, packet) {
  console.log('topic is ' + topic)
})

// connect
client.on('connect', function () {
  console.log('connected  ' + client.connected)
})

//handle errors
client.on('error', function (error) {
  console.log("Can't connect" + error)
  process.exit(1)
})

//reconnect
if (!client.connected) {
  client.on('reconnect', function () {
    console.log('reconnecting')
  })
}
//publish
function publish(topic, msg, options) {
  let msg2 = JSON.stringify(
    data.features[0].geometry.coordinates[count].reverse(),
  )
  console.log('publishing', msg2, client.connected)
  if (client.connected == true) {
    client.publish(topic, msg2, options)
  }
  count += 1
  if (count === 618) {
    //ens script
    clearInterval(timer_id) //stop timer
    client.end()
  }
}

//////////////
// subscribe

const options = {
  retain: true,
  qos: 2,
}

console.log('subscribing to topics')
client.subscribe(topic) //object
const timer_id = setInterval(function () {
  publish(topic, message, options)
}, 1300)
//notice this is printed even before we connect
console.log('end of script')
