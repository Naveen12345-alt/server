const mqtt = require('mqtt')
const data = require('./data/Directions_from_Delhi_to_Gurgaon_Haryana.json')

class MqttHandler {
  constructor() {
    this.client = null
    this.count = 0
    this.level = 0
    this.message = data.features[0].geometry
    // message
    this.topic = 'testtopic/aplha'
    this.timer_id = 0
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.client = mqtt.connect('mqtt://broker.hivemq.com', {
      clientId: 'mqttjs01#gameit',
      keepAlive: 1800000,
      cleanSession: false,
    })

    // Mqtt error calback
    this.client.on('error', err => {
      console.log(err)
      this.client.end()
    })

    // Mqtt reconnect
    if (!this.client.connected) {
      this.client.on('reconnect', () => {
        console.log('reconnecting')
      })
    }

    // Connection callback
    this.client.on('connect', () => {
      console.log('connected  ' + this.client.connected)
    })

    // mqtt subscriptions
    this.client.subscribe(this.topic, {
      retain: true,
      qos: 2,
    })

    // When a message arrives, console.log it
    this.client.on('message', () => {
      console.log('topic is ' + this.topic)
    })

    this.client.on('close', () => {
      console.log(`mqtt client disconnected`)
    })
    // Sends a mqtt message to topic: mytopic
    this.timer_id = setInterval(() => {
      this.publish(this.topic, this.message, {
        retain: true,
        qos: 2,
      })
    }, 10)
  }

  publish(topic, msg, options) {
    if (this.level === 0)
      msg = JSON.stringify(msg.coordinates[this.count].reverse())
    else msg = JSON.stringify(msg.coordinates[this.count])

    console.log(
      'publishing',
      msg,
      this.client.connected,
      this.count,
      this.level,
    )
    if (this.client.connected == true) {
      this.client.publish(topic, msg, options)
    }
    this.count += 1
    if (this.count === 618) {
      //ens script
      this.level = 1
      this.count = 1
      // clearInterval(timer_id) //stop timer
      // client.end()
    }
  }
}

module.exports = MqttHandler
