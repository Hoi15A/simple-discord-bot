const format = require('../lib/format.js')

module.exports = {
  getInfo: function () {
    let info = {
      'name': 'js',
      'requiredPermission': 'BOT_OWNER',
      'enabled': false,
      'man': format.help(
        'js',
        'Runs js code with eval()',
        `${process.env.PREFIX}js <string>`,
        [
          `${process.env.PREFIX}js 2+2`,
          `${process.env.PREFIX}js 'NA'.repeat(8) + ' BATMAN!'`,
          `${process.env.PREFIX}js msg.author.username`
        ],
        'BOT_OWNER'
      )
    }
    return info
  },
  command: function (msg, params) {
    var out = ''
    try {
      out = eval(params) // eslint-disable-line no-eval
    } catch (e) {
      console.log(e)
      out = e.toString()
    }

    if (out === undefined) {
      out = 'undefined'
    }

    if (out.length > 1800) {
      out = out.substring(0, 1800)
      out += '\n[Rest of string cut off due to Discord\'s message limit]'
    }

    msg.channel.send('In:\n```zsh\n' + escapeQuotes(params) + '\n```\nOut:\n```\n' + escapeQuotes(out) + '\n```')
    msg.delete()
  }
}

function escapeQuotes (text) {
  return text.toString().replace(/`/g, '\\`')
}
