require('dotenv').config()
if (process.env.REPO_BASE_URL === '' || process.env.REPO_BASE_URL === undefined) {
  process.env.REPO_BASE_URL = 'https://github.com/Hoi15A/simple-discord-bot'
}

const fs = require('fs')
const Discord = require('discord.js')
const childProcess = require('child_process')
const client = new Discord.Client()

const permissions = require('./lib/permissions.js')

// Create temp directory
const dir = './tmp'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

var commands = []
var names = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  fs.readdirSync('./commands').forEach(file => {
    commands.push({
      'info': require('./commands/' + file).getInfo(),
      'command': require('./commands/' + file).command
    })
  })

  commands.map(c => {
    names.push(c.info.name)
  })

  childProcess.exec('git rev-parse --short HEAD && git rev-parse HEAD', function (err, stdout) {
    if (err) {
      console.log('Unable to fetch commit hash...')
      console.error(err)
      return
    }
    var lines = stdout.split('\n')
    process.env.shorthash = lines[0]
    process.env.hash = lines[1]
  })

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('Following commands have been enabled: ')
  console.log(names.join(', '), '\n')
})

client.on('message', msg => {
  var message = msg.content
  if (message.substring(0, process.env.PREFIX.length) !== process.env.PREFIX) {
    return
  }
  message = message.replace(process.env.PREFIX, '')
  var cmd = message.split(/ (.+)/)[0]
  var params = message.split(/ (.+)/)[1]

  commands.map(command => {
    if (cmd === command.info.name) {
      if (permissions.check(msg.member, command.info.permissionLevel)) {
        command.command(msg, params)
      } else {
        msg.channel.send({
          'embed': {
            'color': 0x700000,
            'author': {
              'name': 'I\'m sorry ' + msg.member.user.username + ', I\'m afraid I can\'t do that',
              'icon_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/220px-HAL9000.svg.png'
            }
          }
        })
      }
    }
  })

  if (cmd === 'help' || cmd === 'man') {
    if (params === 'help' || params === 'man') {
      msg.reply('you cute little idiot OwO\nYou aleady know how to use ' + cmd + '!')
      return
    } else if (params === undefined) {
      msg.channel.send('The following commands are available:\n```\n' + names.join(', ') +
      '```\nUse them with: `' + process.env.PREFIX + '<command>`\nAnd use `' + process.env.PREFIX + 'help <command>` to get more information on a specific command.')
      return
    }

    for (var j = 0; j < commands.length; j++) {
      if (commands[j].info.name === params) {
        if (typeof commands[j].info.man === 'string') {
          msg.channel.send(commands[j].info.man, function (err) {
            console.log(err)
          })
          return
        }
      }
    }
    msg.channel.send('It seems that there is no help available for: `' + params + '`\n')
  } else if (cmd === 'commands') {
    msg.channel.send('The following commands are available:\n```\n' + names.join(', ') + '```')
  }
})

client.login(process.env.DISCORD_TOKEN)
