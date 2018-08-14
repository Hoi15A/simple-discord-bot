require('dotenv').config()
if (process.env.REPO_BASE_URL === '' || process.env.REPO_BASE_URL === undefined) {
  process.env.REPO_BASE_URL = 'https://github.com/Hoi15A/simple-discord-bot'
}

const fs = require('fs')
const Discord = require('discord.js')
const childProcess = require('child_process')
const client = new Discord.Client()
const send = require('./lib/messageSender')

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
      'command': require('./commands/' + file).command,
      'filename': file
    })
  })

  commands.map(c => {
    if (c.info.enabled) names.push(c.info.name)
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
      if (!command.info.enabled) return
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

  if (permissions.check(msg.member, 'owner')) {
    var command
    if (cmd === 'enable') {
      command = commands.find((v) => v.info.name === params)
      if (command === undefined) return send.standardResponse(msg, 'That command doesn\'t exist!', { name: 'enable command' })
      if (command.info.enabled) return send.standardResponse(msg, 'That command is already enabled!', { name: 'enable command' })
      command.info.enabled = true
      names.push(command.info.name)
      names.sort()
      send.standardResponse(msg, 'Successfully enabled the command **' + command.info.name + '**.', { name: 'enabled command' })
    } else if (cmd === 'disable') {
      command = commands.find((v) => v.info.name === params)
      if (command === undefined) return send.standardResponse(msg, 'That command doesn\'t exist!', { name: 'disable command' })
      if (!command.info.enabled) return send.standardResponse(msg, 'That command is already disabled!', { name: 'disable command' })
      command.info.enabled = false
      names.splice(names.indexOf(command.info.name), 1)
      names.sort()
      send.standardResponse(msg, 'Successfully disabled the command **' + command.info.name + '**.', { name: 'disabled command' })
    } else if (cmd === 'reload') {
      var commandIndex = commands.findIndex((v) => v.info.name === params)
      if (commandIndex === -1) return send.standardResponse(msg, 'That command doesn\'t exist!', { name: 'reload' })
      command = commands[commandIndex]
      delete require.cache[require.resolve('./commands/' + command.filename)]
      commands[commandIndex] = {
        'info': require('./commands/' + command.filename).getInfo(),
        'command': require('./commands/' + command.filename).command
      }
      var index = names.indexOf(commands[commandIndex].info.name)
      if (index !== -1) {
        names.splice(index, 1)
      }
      if (commands[commandIndex].info.enabled) names.push(commands[commandIndex].info.name)
      names.sort()
      send.standardResponse(msg, 'Successfully reload the command **' + command.info.name + '**.', { name: 'reload' })
    }
  }
})

client.login(process.env.DISCORD_TOKEN)
