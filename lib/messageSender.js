const Discord = require('discord.js')

module.exports = {
  standardResponse: function (msg, text, info, thumbnail) {
    var colour = info.colour
    if (colour === undefined || colour === null || colour === '') {
      colour = process.env.EMBED_COLOUR
    }
    if (thumbnail === undefined || thumbnail === null) {
      thumbnail = ''
    }

    var date = new Date()
    var embed = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor(colour)
      .setDescription(text)
      .setFooter(capitalizeFirstLetter(info.name))
      .setTimestamp(date.toISOString())
      .setThumbnail(thumbnail)

    return msg.channel.send(embed)
  },

  sendImage: function (msg, info, image, caption, isLocalfile, attachmentName) {
    var colour = info.colour
    if (colour === undefined || colour === null || colour === '') {
      colour = process.env.EMBED_COLOUR
    }
    if (caption === undefined || caption === null) {
      caption = ''
    }

    var attachment = ''
    if (isLocalfile) {
      attachment = image
      image = 'attachment://' + attachmentName
    }

    var date = new Date()
    var embed = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor(colour)
      .setFooter(capitalizeFirstLetter(info.name))
      .setTimestamp(date.toISOString())
      .setDescription(caption)
      .setImage(image)
      .attachFile(attachment)

    return msg.channel.send(embed)
  }
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
