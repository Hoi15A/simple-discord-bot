module.exports = {
  getInfo: function () {
    var info = {
      'name': 'figfonts',
      'requiredPermission': '',
      'man': '`' + process.env.PREFIX + 'figfonts`\nLists figlet fonts',
      'enabled': true
    }
    return info
  },
  command: function (msg, params) {
    msg.channel.send('https://pastebin.com/g723fkZa')
  }
}
