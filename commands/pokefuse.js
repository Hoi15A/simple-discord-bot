const send = require('../lib/messageSender.js')
const pokemon = require('pokemon')
const cheerio = require('cheerio')
const request = require('request')

const info = {
  'name': 'pkfuse',
  'permissionLevel': 'everyone',
  'colour': null,
  'man': 'Fuses 2 Pokémon\n`' + process.env.PREFIX + 'pkfuse <name/id> <name/id> <inputLang>`\n' + '`' + process.env.PREFIX + 'pkfuse random`\n' + '\n\n__**Input:**__\nNames or ids of two of the first 151 Pokémon and optionally an input language.\nYou can also enter just `random` to get a random fusion'
}

module.exports = {
  getInfo: function () {
    return info
  },
  command: function (msg, params) {
    if (params === undefined) {
      send.standardResponse(msg, 'You need to supply the proper parameters!\nSee `' + process.env.PREFIX + 'help pkfuse`', info)
      return
    }
    var random = false
    if (params.toLowerCase() === 'random' || params.toLowerCase() === 'r') {
      random = true
    }
    var pk1, pk2
    if (!random) {
      var splitParams = params.split(' ')
      if (splitParams.length < 2 && !random) {
        send.standardResponse(msg, 'You need to supply the proper parameters!\nSee `' + process.env.PREFIX + 'help pkfuse`', info)
        return
      }
      pk1 = splitParams[0]
      pk2 = splitParams[1]
      var availableLangs = ['en', 'de', 'fr', 'ja', 'ko', 'ru']
      var lang
      if (splitParams[2] === undefined) {
        lang = 'en'
      } else {
        lang = splitParams[2]
      }

      var found = false
      for (var i = 0; i < availableLangs.length; i++) {
        if (availableLangs[i] === lang) {
          found = true
        }
      }
      if (!found) {
        send.standardResponse(msg, 'You supplied an invalid language!\nYou have the following options:\n' + availableLangs.join('\n'), info)
        return
      }

      try {
        if (isNaN(pk1)) {
          pk1 = pokemon.getId(formatPokemonName(pk1), lang)
        } else {
          pk1 = parseInt(pk1)
        }
        if (isNaN(pk2)) {
          pk2 = pokemon.getId(formatPokemonName(pk2), lang)
        } else {
          pk2 = parseInt(pk2)
        }
      } catch (e) {
        send.standardResponse(msg, 'You used an invalid Pokémon name!\n\nSee `' + process.env.PREFIX + 'help pkfuse`', info)
        return
      }

      if (pk1 > 151 || pk1 < 1 || pk2 > 151 || pk2 < 1) {
        send.standardResponse(msg, 'You used an invalid Pokémon id!\nMake sure the Pokémon is in the first 151\n\nSee `' + process.env.PREFIX + 'help pkfuse`', info)
        return
      }
    } else {
      pk1 = Math.round(Math.random() * 151)
      pk2 = Math.round(Math.random() * 151)
    }

    var imageUrl = 'http://images.alexonsager.net/pokemon/fused/' + pk1 + '/' + pk1 + '.' + pk2 + '.png'
    var requestUrl = 'http://pokemon.alexonsager.net/' + pk1 + '/' + pk2
    request(requestUrl, function (error, response, body) {
      if (error) {
        console.error(error)
        send.standardResponse(msg, 'ERROR:\n```\n' + error + '\n```', info)
        return
      }
      var $ = cheerio.load(body)
      var caption = '**' + pokemon.getName(pk1) + '** [' + pk1 + '] + **' + pokemon.getName(pk2) + '** [' + pk2 + '] = **' + $('#pk_name').text() + '**'
      send.sendImage(msg, info, imageUrl, caption)
    })
  }
}

function formatPokemonName (string) {
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}
