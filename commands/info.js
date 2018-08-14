module.exports = {
  getInfo: function () {
    var info = {
      'name': 'info',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'info`\nProvides a bit of information on the bot',
      'enabled': true
    }
    return info
  },
  command: function (msg, params) {
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
