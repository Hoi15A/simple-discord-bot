module.exports = {
  getInfo: function () {
    var info = {
      'name': 'invite',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'invite`\nDisplays the bot\'s invite'
    }
    return info
  },
  command: function (msg, params) {
    var inviteEmbed = {
      'embed': {
        'title': 'Invite the bot',
        'color': 0xffb6c1,
        'thumbnail': {
          'url': msg.client.user.avatarURL
        },
        'description': `You can invite the bot using [this link](https://discordapp.com/oauth2/authorize?client_id=${msg.client.user.id}&scope=bot&permissions=0)`,
        'timestamp': new Date().toISOString(),
        'footer': {
          'text': `${msg.author.tag}`,
          'icon_url': msg.client.user.avatarURL
        }
      }
    }
    msg.channel.send(inviteEmbed)
  }
}
