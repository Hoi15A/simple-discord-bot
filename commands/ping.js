const clocks = require('../lib/clocks.json')

module.exports = {
  getInfo: function () {
    var info = {
      'name': 'ping',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'ping`\nReplies with `Pong!`'
    }
    return info
  },
  command: function (msg, params) {
    const timeThen = Date.now()
    msg.channel.send('_Measuring..._').then(m => {
      const latency = Date.now() - timeThen
      m.edit('Pong! ' + clocks[0] + ' ' + latency + 'ms')
      updateClocks(m, latency, 0)
    })
  }
}

function updateClocks (m, latency, counter) {
  m.edit('Pong! ' + clocks[counter] + ' ' + latency + 'ms')
  counter++
  if (counter < clocks.length) {
    setTimeout(() => {
      updateClocks(m, latency, counter)
    }, 2000)
  }
}
