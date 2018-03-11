require('dotenv').config()

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
  console.log(commands)
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
      command.command(msg, params)
    }
  })

  if (cmd === 'help' || cmd === 'man') {
    if (params === 'help' || params === 'man') {
      msg.reply('you cute little idiot OwO\nYou aleady know how to use ' + cmd + '!')
      return
    } else if (cmd === 'commands') {
      // TODO: msg.channel.send()
    }

    for (var j = 0; j < commands.length; j++) {
      if (commands[j].info.name === params) {
        if (typeof commands[j].info.man === 'string') {
          msg.channel.send(commands[j].info.man)
          return
        }
      }
    }
    msg.channel.send('It seems that there is no help available for: `' + params + '`\n')
  }
})

client.login(process.env.DISCORD_TOKEN)
