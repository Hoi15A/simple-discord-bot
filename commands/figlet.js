const format = require('../lib/format.js')
const figlet = require('figlet')
const fs = require('fs')
const fonts = fs.readFileSync('./assets/figfontslist.txt').toString().split('\n')

module.exports = {
  getInfo: function () {
    let info = {
      'name': 'figlet',
      'requiredPermission': '',
      'enabled': true,
      'man': format.help(
        'figlet',
        'Turns any text into even bigger text\nYou can also optionally tell it what font to use\nTo see a list of fonts, pass \'--listfonts\'',
        `${process.env.PREFIX}figlet --font '{font}' <string>`,
        [
          `${process.env.PREFIX}figlet this is huge`,
          `${process.env.PREFIX}figlet --font 'Doh' BIGGER`,
          `${process.env.PREFIX}figlet -r Random font`,
          `${process.env.PREFIX}figlet --listfonts`
        ]
      )
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
    if (args.listfonts) {
      msg.channel.send('https://pastebin.com/g723fkZa')
      return
    }
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
      let figText = data.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '')
      let trimmed = figText.trim()
      if (trimmed.length === 0) {
        msg.channel.send('No output from figlet, you probably only used characters figlet doesnt know')
        return
      }
      if (figText.length < 1990) {
        msg.channel.send('```\n' + figText + '```')
      } else {
        msg.channel.send('Sorry, that message would exceed the max character limit. [' + figText.length + '/2000]')
      }
    })
  }
}
