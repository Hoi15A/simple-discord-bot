const send = require('../lib/messageSender.js')

const info = {
  'name': 'rename',
  'permissionLevel': 'admin',
  'colour': '',
  'man': 'Renames up to 10 random people on a server\nUse: ' + process.env.PREFIX + 'rename <number> <string>',
  'enabled': true
}

module.exports = {
  getInfo: function () {
    return info
  },
  command: function (msg, params) {
    if (!msg.guild.me.hasPermission('MANAGE_NICKNAMES')) {
      send.standardResponse(msg, 'This bot is missing the `Manage Nicknames` permission!', info)
      return
    }

    var amount = params.split(' ', 1)
    if (isNaN(parseInt(amount))) {
      send.standardResponse(msg, 'You need to send a number as the first parameter', info)
      return
    }
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
    var renamedMembers = []
    var failCount = 0
    keys.map(key => {
      var p = msg.guild.members.get(key).setNickname(newName, 'Rename issued by: ' + msg.author.tag)
      p.then(member => {
        renamedMembers.push(member.user.tag)
      }).catch(err => {
        console.error(err)
        failCount++
      })
      promises.push(p)
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
          messagetxt = 'Renamed ' + parseInt(amount) + ' people to `' + newName + '`:\n' + peopleRenamed.join('\n')
        }

        send.standardResponse(msg, messagetxt, info)
      })
      .catch(err => {
        console.error(err)
        var response = ''
        if (renamedMembers.length === 0) {
          response = 'Nobody was renamed.\nMake sure this bot actually can rename people for this command to work.\n_(For example this bot may have tried to rename people higher up in the hierarchy)_'
        } else if (renamedMembers.length === 1) {
          response = 'Renamed **' + renamedMembers[0] + '** to `' + newName + '`'
          if (failCount > 0) {
            response += '\n\nAnd **' + failCount + '** renames failed.'
          }
        } else {
          response = 'Renamed ' + parseInt(amount) + ' people to `' + newName + '`:\n' + renamedMembers.join('\n')
          if (failCount > 0) {
            response += '\n\nAnd **' + failCount + '** rename(s) failed.'
          }
        }
        send.standardResponse(msg, response, info)
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
