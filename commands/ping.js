const clocks = require('../lib/clocks.json')
const format = require('../lib/format.js')
const send = require('../lib/messageSender.js')

const info = {
  'name': 'ping',
  'requiredPermission': '',
  'colour': null,
  'enabled': true,
  'man': format.help(
    'ping',
    `Generic Ping command #${(Math.floor(Math.random() * 999) + 1).toString()}`,
    `${process.env.PREFIX}ping`,
    []
  )
}

module.exports = {
  getInfo: function () {
    return info
  },
  command: function (msg) {
    const timeThen = Date.now()
    send.standardResponse(msg, '_Measuring..._', info).then(m => {
      const latency = Date.now() - timeThen
      var embed = m.embeds[0]
      embed = removeCircularJson(embed)
      embed.description = 'Pong! ' + clocks[Math.floor(Math.random() * clocks.length)] + ' ' + latency + `ms\nMessage Latency: ${m.createdTimestamp - msg.createdTimestamp}ms`
      embed.author.icon_url = msg.author.avatarURL
      const date = new Date()
      embed.timestamp = date.toISOString()
      m.edit({ 'embed': embed })
    })
  }
}

function removeCircularJson (obj) {
  var cache = []
  return JSON.parse(JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return
      }
      // Store value in our collection
      cache.push(value)
    }
    return value
  }))
}
