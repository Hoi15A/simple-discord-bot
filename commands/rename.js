const send = require('../lib/messageSender.js')

const info = {
  'name': 'rename',
  'permissionLevel': 'admin',
  'colour': '',
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
    } else if (newName.length > 32 || newName.length < 1) {
      send.standardResponse(msg, 'Your new name does not fit within 1-32 characters!\n**' + newName.length + '/32 Characters**', info)
      return
    }

    for (var i = 0; i < amount; i++) {
      keys.push(getRandomKey(msg.guild.members))
    }

    var promises = []
    keys.map(key => {
      promises.push(msg.guild.members.get(key).setNickname(newName, 'Rename issued by: ' + msg.author.tag))
    })

    Promise.all(promises)
      .then(results => {
        var peopleRenamed = []
        results.map(guildMember => {
          peopleRenamed.push(guildMember.user.tag)
        })
        var messagetxt
        if (peopleRenamed.length === 1) {
          messagetxt = 'Renamed **' + peopleRenamed[0] + '** to `' + newName + '`'
        } else {
          messagetxt = 'Renamed ' + amount + ' people to `' + newName + '`:\n' + peopleRenamed.join('\n')
        }

        send.standardResponse(msg, messagetxt, info)
      })
      .catch(err => {
        if (err.code === 0) {
          send.standardResponse(msg, 'This command requires the `Manage Nicknames` permission to function.\nIf you wish to use this command please add that permission to the bot.', info)
        }
        console.log(err)
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
