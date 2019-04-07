const alphabet = require('../lib/alphabetMap.json')
const format = require('../lib/format.js')

module.exports = {
  getInfo: function () {
    let info = {
      'name': 'bigtxt',
      'requiredPermission': '',
      'enabled': true,
      'man': format.help(
        'bigtxt',
        'Converts text to regional indicators',
        `${process.env.PREFIX}bigtxt <string>`,
        [
          `${process.env.PREFIX}bigtxt hello`,
          `${process.env.PREFIX}bigtxt owo whats this`
        ]
      )
    }
    return info
  },
  command: function (msg, params) {
    const exp = /[^a-z 0-9.]/gi
    if (typeof params !== 'string') {
      return
    }
    params = params.replace(exp, '').toLowerCase()
    var chars = params.split('')
    var mapped = chars.map(char => {
      if (char === ' ') {
        return ' '
      } else if (char === '.') {
        return '\n'
      } else {
        return alphabet[char]
      }
    })
    msg.channel.send(mapped.join(' '))
  }
}
