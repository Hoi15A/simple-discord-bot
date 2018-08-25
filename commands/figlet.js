const figlet = require('figlet')
const fs = require('fs')
const fonts = fs.readFileSync('./assets/figfontslist.txt').toString().split('\n')

module.exports = {
  getInfo: function () {
    var info = {
      'name': 'figlet',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'figlet --font="<optional>" <text>`\nDisplays text with figlet (optionally with a specific font)\nFind a list of fonts with: `' + process.env.PREFIX + 'figfonts`',
      'enabled': true
    }
    return info
  },
  command: function (msg, params) {
    if (params === undefined) {
      msg.channel.send('Figlet expects one or more arguments!').then(function (resp) {
        setTimeout(function () {
          msg.delete()
          resp.delete()
        }, 5000)
      })
      return
    }

    var font = ''
    var args = require('yargs-parser')(params)
    if (args.r !== undefined) {
      if (typeof args.r !== 'boolean') {
        args._ = [args.r].concat(args._)
      }
      font = fonts[Math.floor(Math.random() * fonts.length)].trim()
    } else if (args.font !== undefined) {
      font = args.font
    }

    figlet.text(args._.join(' '), {
      font: font,
      horizontalLayout: 'default',
      verticalLayout: 'default'
    }, function (err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          msg.channel.send('Sorry, the font `' + font + '` does not exist!')
          return
        }
        console.log('Something went wrong...')
        console.log(err)
        return
      }
      var figText = data.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '')
      if (figText.length < 1990) {
        msg.channel.send('```\n' + figText + '```')
      } else {
        msg.channel.send('Sorry, that message would exceed the max character limit. [' + figText.length + '/2000]')
      }
    })
  }
}
