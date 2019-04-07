const format = require('../lib/format.js')
const childProcess = require('child_process')

module.exports = {
  getInfo: function () {
    let info = {
      'name': 'eval',
      'requiredPermission': 'BOT_OWNER',
      'enabled': false,
      'man': format.help(
        'eval',
        'Runs any shell command passed',
        `${process.env.PREFIX}eval <string>`,
        [
          `${process.env.PREFIX}eval ls`,
          `${process.env.PREFIX}eval echo hello world`,
          `${process.env.PREFIX}eval cd commands; cat eval.js`
        ],
        'BOT_OWNER'
      )
    }
    return info
  },
  command: function (msg, params) {
    var out = ''
    childProcess.exec(params, function (err, resp) {
      if (err) {
        out = err.toString()
      } else {
        out = resp
      }

      if (out.length > 1800) {
        out = out.substring(0, 1800)
        out += '\n[Rest of string cut off due to Discord\'s message limit]'
      }

      msg.channel.send('In:\n```zsh\n' + escapeQuotes(params) + '\n```\nOut:\n```\n' + escapeQuotes(out) + '\n```')
      msg.delete()
    })
  }
}

function escapeQuotes (text) {
  return text.replace(/`/g, '\\`')
}
