const send = require('../lib/messageSender.js')
const fs = require('fs')
const path = require('path')

const pokemon = require('pokemon')
const cheerio = require('cheerio')
const request = require('request')
const trimCanvas = require('trim-canvas')
const { createCanvas, loadImage } = require('canvas')

const backgroundSize = [256, 144]
const circleSize = [126, 32]
const backdrops = require('../lib/backdrops.json')

const info = {
  'name': 'pkfuse',
  'permissionLevel': 'everyone',
  'colour': null,
  'man': 'Fuses 2 Pokémon\n`' + process.env.PREFIX + 'pkfuse <name/id> <name/id> <inputLang>`\n' + '`' + process.env.PREFIX + 'pkfuse random`\n' + '\n\n__**Input:**__\nNames or ids of two of the first 151 Pokémon and optionally an input language.\nYou can also just enter `random` to get a random fusion',
  'enabled': true
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
      pk1 = Math.round(Math.random() * 150) + 1
      pk2 = Math.round(Math.random() * 150) + 1
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

      const canvas = createCanvas(backgroundSize[0], backgroundSize[1])
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#FF0000'
      ctx.fillRect(0, 0, backgroundSize[0], backgroundSize[1])

      var fusePath = path.dirname(require.main.filename) + '/tmp/' + $('#pk_name').text() + '.png'
      var resultPath = path.dirname(require.main.filename) + '/tmp/' + $('#pk_name').text() + '-result.png'
      var resultFilename = $('#pk_name').text() + '-result.png'

      request(imageUrl).pipe(fs.createWriteStream(fusePath)).on('close', () => {
        loadImage(fusePath).then((fusion) => {
          loadImage('./assets/battleBGs.png').then((battlebg) => {
            var backdrop = getRandomBackdropCoords()
            ctx.drawImage(
              battlebg,
              backdrop.bg.x1, backdrop.bg.y1, // source xy1
              backgroundSize[0], backgroundSize[1], // source xy1
              0, 0, // destination xy1
              backgroundSize[0], backgroundSize[1] // destination xy2
            )

            ctx.drawImage(
              battlebg,
              backdrop.circle.x1, backdrop.circle.y1, // source xy1
              circleSize[0], circleSize[1], // source xy1
              backgroundSize[0] / 2 - circleSize[0] / 2, backgroundSize[1] / 2 + backgroundSize[1] / 5, // destination xy1
              circleSize[0], circleSize[1] // destination xy2
            )

            const fuseCanvas = createCanvas(240, 240)
            const fusectx = fuseCanvas.getContext('2d')

            fusectx.drawImage(fusion, 0, 0)
            trimCanvas.default(fuseCanvas)
            ctx.drawImage(
              fuseCanvas,
              backgroundSize[0] / 2 - fuseCanvas.width / 2.2 / 2, backgroundSize[1] - fuseCanvas.height / 2.2 - 22,
              fuseCanvas.width / 2.2, fuseCanvas.height / 2.2
            )

            const out = fs.createWriteStream(resultPath)
            const stream = canvas.createPNGStream()
            stream.pipe(out)
            out.on('finish', () => {
              send.sendImage(msg, info, resultPath, caption, true, resultFilename).then(resp => {
                fs.unlink(fusePath, (err) => {
                  if (err) {
                    console.error(err)
                  }
                  // console.log(fusePath, 'was deleted')
                })
                fs.unlink(resultPath, (err) => {
                  if (err) {
                    console.error(err)
                  }
                  // console.log(resultPath, 'was deleted')
                })
              })
            })
          })
        })
      })
    })
  }
}

function formatPokemonName (string) {
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getRandomBackdropCoords () {
  var backdrop = backdrops[Math.floor(Math.random() * backdrops.length)]
  var times = ['day', 'noon', 'night']
  var time = times[Math.floor(Math.random() * times.length)]
  // console.log(backdrop.location, time)
  var backgrounds = backdrop.backgrounds
  var circles = backdrop.circles

  var bg = {'x1': null, 'y1': null}
  var circle = {'x1': null, 'y1': null}

  for (var i = 0; i < backgrounds.length; i++) {
    if (backgrounds[i].time === time) {
      bg.x1 = backgrounds[i].coords[0]
      bg.y1 = backgrounds[i].coords[1]
      break
    }
  }

  for (var j = 0; j < circles.length; j++) {
    if (circles[j].time === time) {
      circle.x1 = circles[j].coords[0]
      circle.y1 = circles[j].coords[1]
      break
    }
  }

  return {'bg': bg, 'circle': circle}
}
