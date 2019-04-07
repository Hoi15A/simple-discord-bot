const format = require('../lib/format.js')

module.exports = {
  getInfo: function () {
    let info = {
      'name': 'invite',
      'requiredPermission': '',
      'man': format.help(
        'invite',
        'Returns the invite to add this bot to a guild',
        `${process.env.PREFIX}invite`,
        []
      )
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
