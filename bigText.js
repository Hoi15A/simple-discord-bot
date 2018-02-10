const exp = /[^a-z .]/gi
const alphabet = {
  'a': '🇦',
  'b': '🇧',
  'c': '🇨',
  'd': '🇩',
  'e': '🇪',
  'f': '🇫',
  'g': '🇬',
  'h': '🇭',
  'i': '🇮',
  'j': '🇯',
  'k': '🇰',
  'l': '🇱',
  'm': '🇲',
  'n': '🇳',
  'o': '🇴',
  'p': '🇵',
  'q': '🇶',
  'r': '🇷',
  's': '🇸',
  't': '🇹',
  'u': '🇺',
  'v': '🇻',
  'w': '🇼',
  'x': '🇽',
  'y': '🇾',
  'z': '🇿'
}

module.exports = {
  replaceText: function (input) {
    input = input.replace(exp, '')
    var chars = input.split('')
    var mapped = chars.map(char => {
      if (char === ' ') {
        return ' '
      } else if (char === '.') {
        return '\n'
      } else {
        return alphabet[char]
      }
    })
    return mapped.join(' ')
  }
}
