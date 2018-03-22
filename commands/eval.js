const childProcess = require('child_process')

module.exports = {
  getInfo: function () {
    var info = {
      'name': 'eval',
      'permissionLevel': 'owner'
    }
    return info
  },
  command: function (msg, params) {
    var out = ''
    try {
      out = childProcess.execSync(params).toString()
    } catch (e) {
      out = e.toString()
    }

    if (out.length > 1900) {
      out = out.substring(0, 1900)
    }

    msg.channel.send('In:\n```zsh\n' + escapeQuotes(params) + '\n```\nOut:\n```\n' + escapeQuotes(out) + '\n```')
    msg.delete()
  }
}

function escapeQuotes (text) {
  return text.replace(/`/g, '\\`')
}
