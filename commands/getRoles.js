const format = require('../lib/format.js')
const send = require('../lib/messageSender.js')

const info = {
  'name': 'getroles',
  'requiredPermission': 'MANAGE_GUILD',
  'colour': '#3a7fc4',
  'enabled': true,
  'man': format.help(
    'getroles',
    'Returns a list of all roles in this guild',
    `${process.env.PREFIX}getroles`,
    [],
    'MANAGE_GUILD'
  )
}

module.exports = {
  getInfo: function () {
    return info
  },
  command: function (msg) {
    var allRoles = []
    msg.guild.roles.map(role => {
      allRoles.push(role.name + ': ' + role.id)
    })
    allRoles.sort((a, b) => a.localeCompare(b))
    send.standardResponse(msg, allRoles.join('\n'), info)
  }
}
