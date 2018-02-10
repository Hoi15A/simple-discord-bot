require('dotenv').config()
const Discord = require('discord.js')
const bigText = require('./bigText.js')

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === process.env.PREFIX + 'help') {
    msg.channel.send('https://media.giphy.com/media/l4Ki2obCyAQS5WhFe/giphy.gif')
  }

  if (msg.content === process.env.PREFIX + 'ping') {
    msg.reply('Pong!')
  }

  if (msg.content === process.env.PREFIX + 'anything but ping') {
    msg.reply('no u')
  }

  var splitContent = msg.content.split(' ')

  if (splitContent[0] === process.env.PREFIX + 'thing') {
    splitContent.splice(0, 1)
    var text = splitContent.join(' ')
    msg.channel.send(bigText.replaceText(text))
    msg.delete()
  }
})

client.login(process.env.DISCORD_TOKEN)
