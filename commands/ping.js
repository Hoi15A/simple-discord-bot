module.exports = {
  getInfo: function () {
    var info = {
      'name': 'ping',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'ping`\nReplies with `Pong!`'
    }
    return info
  },
  command: function (msg, params) {
    msg.reply('Pong!')
  }
}
