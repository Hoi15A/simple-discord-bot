if (process.env.BOT_OWNERS === undefined) {
  process.env.BOT_OWNERS = ''
}

const owners = process.env.BOT_OWNERS.split(',')

module.exports = {
  check: function (member, requiredPermission) {
    let userAllowed = false
    if (requiredPermission === 'BOT_OWNER') {
      owners.map(owner => {
        if (member.id === owner) {
          userAllowed = true
        }
      })
    } else if (requiredPermission === '') {
      userAllowed = true
    } else {
      userAllowed = member.permissions.has(requiredPermission)
    }

    return userAllowed
  }
}
