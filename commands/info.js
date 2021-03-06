const format = require('../lib/format.js')

module.exports = {
  getInfo: function () {
    let info = {
      'name': 'info',
      'requiredPermission': '',
      'enabled': true,
      'man': format.help(
        'info',
        'Returns some basic bot information like uptime and last commit hash',
        `${process.env.PREFIX}info`,
        []
      )
    }
    return info
  },
  command: function (msg) {
    var uptimeSeconds = msg.client.uptime / 1000
    var days = Math.floor(uptimeSeconds / 86400)
    uptimeSeconds %= 86400
    var hours = Math.floor(uptimeSeconds / 3600)
    uptimeSeconds %= 3600
    var minutes = Math.floor(uptimeSeconds / 60)
    var seconds = Math.floor(uptimeSeconds % 60)
    var dateString = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's'

    msg.channel.send({
      'embed': {
        'title': 'Info',
        'description': '__General bot information__',
        'url': process.env.REPO_BASE_URL,
        'color': 1929661,
        'thumbnail': {
          'url': 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png'
        },
        'fields': [
          {
            'name': 'Uptime',
            'value': dateString
          },
          {
            'name': 'Current Commit',
            'value': process.env.shorthash !== undefined ? '[' + process.env.shorthash + '](' + process.env.REPO_BASE_URL + '/commit/' + process.env.hash + ')' : '[Unknown Commit](' + process.env.REPO_BASE_URL + ')'
          }
        ]
      }
    })
  }
}
