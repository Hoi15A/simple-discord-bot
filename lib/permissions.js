if (process.env.BOT_OWNERS === undefined) {
  process.env.BOT_OWNERS = ''
}
if (process.env.BOT_ADMIN_ROLES === undefined) {
  process.env.BOT_ADMIN_ROLES = ''
}

var owners = process.env.BOT_OWNERS.split(',')
var adminRoles = process.env.BOT_ADMIN_ROLES.split(',')

module.exports = {
  check: function (member, commandLevel) {
    var userAllowed = false
    switch (commandLevel) {
      case 'everyone':
        userAllowed = true
        break

      case 'admin':
        member.roles.map(role => {
          adminRoles.map(id => {
            if (role.id === id) {
              userAllowed = true
            }
          })
        })
        // if the person is not an admin but still owner give full rights anyways
        owners.map(owner => {
          if (member.id === owner) {
            userAllowed = true
          }
        })
        break

      case 'owner':
        owners.map(owner => {
          if (member.id === owner) {
            userAllowed = true
          }
        })
        break

      default:
        userAllowed = false
    }
    return userAllowed
  }
}
