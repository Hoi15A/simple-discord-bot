const childProcess = require('child_process')

module.exports = {
  getInfo: function () {
    var info = {
      'name': 'info',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'info`\nProvides a bit of information on the bot'
    }
    return info
  },
  command: function (msg, params) {
    var dateString = require("pretty-ms")(message.client.uptime)

    childProcess.exec('git rev-parse HEAD', function (err, stdout) {
      if (err) {
        console.log('Something went wrong...')
        console.log(err)
        return
      }
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
              'value': '[' + stdout + '](' + process.env.REPO_BASE_URL + '/commit/' + stdout + ')'
            }
          ]
        }
      })
    })
  }
}
