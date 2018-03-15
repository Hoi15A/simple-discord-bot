const figlet = require('figlet')

module.exports = {
  getInfo: function (prefix) {
    var info = {
      'name': 'figlet',
      'man': '`' + prefix + 'figlet --font="<optional>" <text>`\nDisplays text with figlet (optionally with a specific font)\nFind a list of fonts with: ' + prefix + 'figfonts'
    }
    return info
  },
  command: function (msg, params) {
    var font = ''
    var args = require('yargs-parser')(params)
    if (args.font !== undefined) {
      font = args.font
    }

    figlet.text(args._.join(' '), {
      font: font,
      horizontalLayout: 'default',
      verticalLayout: 'default'
    }, function (err, data) {
      if (err) {
        console.log('Something went wrong...')
        console.log(err)
        return
      }
      var figText = data.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '')
      if (figText.length < 1990) {
        msg.channel.send('```\n' + figText + '```')
      } else {
        msg.channel.send('Sorry, that message is too long to be sent to Discord **[' + figText.length + '/2000]**')
      }
    })
  }
}
