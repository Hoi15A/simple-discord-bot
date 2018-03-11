module.exports = {
  getInfo: function (prefix) {
    var info = {
      'name': 'figfonts',
      'man': '`' + prefix + 'figfonts`\nLists figlet fonts'
    }
    return info
  },
  command: function (msg, params) {
    msg.channel.send('https://pastebin.com/g723fkZa')
  }
}
