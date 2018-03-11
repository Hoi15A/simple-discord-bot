const childProcess = require('child_process')

module.exports = {
  getInfo: function () {
    var info = {
      'name': 'eval'
    }
    return info
  },
  command: function (msg, params) {
    if (msg.member.user.id === '101067188470841344') {
      // TODO: improve this so that its done on a global level using the info
      var out = ''
      try {
        out = childProcess.execSync(params).toString()
      } catch (e) {
        out = e
      }

      if (out.length > 1900) {
        out = out.substring(0, 1900)
      }

      msg.channel.send('In:\n```zsh\n' + params + '\n```\nOut:\n```\n' + out + '\n```')
      msg.delete()
    } else {
      msg.channel.send({
        'embed': {
          'color': 0x700000,
          'author': {
            'name': 'I\'m sorry ' + msg.member.user.username + ', I\'m afraid I can\'t do that',
            'icon_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/220px-HAL9000.svg.png'
          }
        }
      })
    }
  }
}
