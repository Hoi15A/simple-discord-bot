const request = require('request')

module.exports = {
  getInfo: function () {
    var info = {
      'name': 'aur',
      'permissionLevel': 'everyone',
      'man': '`' + process.env.PREFIX + 'aur <search>` to search the Arch User Repository\nDisplays up to 8 results',
      'enabled': true
    }
    return info
  },
  command: function (msg, params) {
    var url = 'https://aur.archlinux.org/rpc/?v=5&type=search&by=name-desc&arg=' + params
    request(url, function (error, response, body) {
      if (error) {
        console.error(error)
      }

      body = JSON.parse(body)
      if (body.results !== undefined) {
        var counter = 0
        var reply = {
          'embed': {
            'title': 'Search results from AUR',
            'url': 'https://aur.archlinux.org',
            'color': 0x1793d1,
            'author': {
              'name': 'AUR',
              'url': 'https://aur.archlinux.org',
              'icon_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/2000px-Archlinux-icon-crystal-64.svg.png'
            },
            'thumbnail': {
              'url': 'https://www.archlinux.org/static/logos/archlinux-logo-white-90dpi.3a3e8fd083d2.png'
            },
            'fields': []
          }
        }
        for (var i = 0; i < body.results.length; i++) {
          if (counter <= 7) {
            reply.embed.fields.push({
              'name': body.results[i].Name + ' ' + body.results[i].Version,
              'value': body.results[i].Description + '\n[[Link]](https://aur.archlinux.org/packages/' + body.results[i].Name + ')'
            })
          } else {
            break
          }
          counter++
        }
        reply.embed.title = counter + ' search results from AUR'
        msg.channel.send(reply)
      }
    })
  }
}
