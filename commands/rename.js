const send = require('../lib/messageSender.js')

const info = {
  'name': 'rename',
  'permissionLevel': 'admin',
  'colour': '#b70000',
  'man': 'Renames up to 10 random people on a server\nUse: ' + process.env.PREFIX + 'rename <number> <string>'
}

module.exports = {
  getInfo: function () {
    return info
  },
  command: function (msg, params) {
    var amount = params.split(' ', 1)
    var newName = params.replace(amount, '').trim()
    var keys = []
    if (amount > 10) {
      send.standardResponse(msg, 'You can only rename up to 10 people', info)
      return
    }
    for (var i = 0; i < amount; i++) {
      keys.push(getRandomKey(msg.guild.members))
    }

    keys.map(key => {
      var oldtag = msg.guild.members.get(key).user.tag
      msg.guild.members.get(key).setNickname(newName, 'testin')
        .then(gm => {
          msg.channel.send('renamed `' + oldtag + '` to `' + newName + '`')
        })
        .catch(err => {
          console.error(err)
        })
    })
  }
}

function getRandomKey (collection) {
  let index = Math.floor(Math.random() * collection.size)
  let cntr = 0
  for (let key of collection.keys()) {
    if (cntr++ === index) {
      return key
    }
  }
}
