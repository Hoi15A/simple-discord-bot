require('dotenv').config()
if (process.env.REPO_BASE_URL === '' || process.env.REPO_BASE_URL === undefined) {
  process.env.REPO_BASE_URL = 'https://github.com/Hoi15A/simple-discord-bot'
}

const fs = require('fs')

const Discord = require('discord.js')
const client = new Discord.Client()

var commands = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  fs.readdirSync('./commands').forEach(file => {
    commands.push({
      'info': require('./commands/' + file).getInfo(process.env.PREFIX),
      'command': require('./commands/' + file).command
    })
  })

  var names = []
  commands.map(c => {
    names.push(c.info.name)
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
      command.command(msg, params, process.env)
    }
  })

  if (cmd === 'help' || cmd === 'man') {
    if (params === 'help' || params === 'man') {
      msg.reply('you cute little idiot OwO\nYou aleady know how to use ' + cmd + '!')
      return
    } else if (params === undefined) {
      msg.channel.send('The following commands are available:\n```\n' + getCommandNames().join(', ') +
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
    msg.channel.send('The following commands are available:\n```\n' + getCommandNames().join(', ') + '```')
  }
})

function getCommandNames () {
  var names = []
  commands.map(c => {
    names.push(c.info.name)
  })
  return names
}

client.login(process.env.DISCORD_TOKEN)
