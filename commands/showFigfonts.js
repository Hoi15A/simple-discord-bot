module.exports = {
  getInfo: function () {
    var info = {
      'name': 'figfonts',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'figfonts`\nLists figlet fonts'
    }
    return info
  },
  command: function (msg, params) {
    msg.channel.send('https://pastebin.com/g723fkZa')
  }
}
