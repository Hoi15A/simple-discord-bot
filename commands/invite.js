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
    'title': 'Invite to the bot',
    'color': 0xffb6c1,
    'thumbnail': {
      'url': message.client.user.avatarURL
      },
    'description': `You can invite the bot using [this link](https://discordapp.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=0`,
    'timestamp': new Date().toDateString(),
    'footer': {
      'text': `${message.author.tag}, today at`,
      'icon_url': message.client.user.avatarURL 
     }
    }
   }
    message.channel.send(inviteEmbed);
  }
 }
