module.exports = {
  getInfo: function (prefix) {
    var info = {
      'name': 'ping',
      'man': '`' + prefix + 'ping`\nReplies with `Pong!`'
    }
    return info
  },
  command: function (msg, params) {
    msg.reply('Pong!')
  }
}
