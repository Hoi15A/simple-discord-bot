module.exports = {
  getInfo: function () {
    var info = {
      'name': 'js',
      'permissionLevel': 'owner',
      'enabled': true
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
  return text.replace(/`/g, '\\`')
}
