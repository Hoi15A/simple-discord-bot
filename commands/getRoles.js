const send = require('../lib/messageSender.js')

const info = {
  'name': 'getroles',
  'permissionLevel': 'admin',
  'colour': '#3a7fc4',
  'man': 'Returns a list of roles on the server'
}

module.exports = {
  getInfo: function () {
    return info
  },
  command: function (msg, params) {
    var allRoles = []
    msg.guild.roles.map(role => {
      allRoles.push(role.name + ': ' + role.id)
    })
    allRoles.sort()
    send.standardResponse(msg, allRoles.join('\n'), info)
  }
}
