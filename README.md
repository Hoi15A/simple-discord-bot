# Simple Discord Bot [![Build Status](https://travis-ci.org/Hoi15A/simple-discord-bot.svg?branch=master)](https://travis-ci.org/Hoi15A/simple-discord-bot)
This is a Discord bot that has a variety of different features ranging from creating huge text to renaming random people.

<hr>

## Setup
### Configuration
Create a `.env` file and set the following values:
```
DISCORD_TOKEN=<discord bot token>
PREFIX=<prefix for bot commands>
REPO_BASE_URL=https://github.com/Hoi15A/simple-discord-bot
EMBED_COLOUR=<hex colour code>
BOT_OWNERS=<user Id's>
BOT_ADMIN_ROLES=<role Id's>
```
You can enter multiple values for owner and admin roles, separate them with `,`
### Running the bot
General Requirements:
- NodeJs
- npm

#### Using just node
Just run `npm install` to get dependencies and start with `npm start`

#### Using pm2
- Install the pm2 process manager by running `npm i pm2 -g`.
- Download the dependencies with `npm install` like above.
- Start the bot with pm2 using `pm2 start index.js` and stop the bot using `pm2 stop index.js`

#### Using docker
Requirements:
- Docker
- Docker-compose

Then simply run `npm run docker-build` to create the image (can be used to recreate after updates).<br>
`npm run docker-down` to stop the bot.<br>
`npm run docker-up` to start it again.

<hr>

## Adding your own commands
Adding commands is actually very easy, they all follow a structure similar to this:
```js
const send = require('../lib/messageSender.js') // includes a few handy functions that automatically format responses nicely

const info = {
  'name': 'getroles', // the name of the command and how it is called (in this example its ""<prefix>getroles")
  'permissionLevel': 'admin', // everyone for everyone, admin for bot admins, owner for just yourself
  'colour': '#3a7fc4', // colour for embeds sent by this command. If not set the default from the .env is used
  'man': 'Returns a list of roles on the server', // manual for the command, returned by the help and man commands
  'enabled': true // if you want the command enabled by default, false if you don't
}

module.exports = {
  getInfo: function () {
    return info
  },
  command: function (msg, params) {
    // you can do whatever you like here, this is just the getroles command as an example
    var allRoles = []
    msg.guild.roles.map(role => {
      allRoles.push(role.name + ': ' + role.id)
    })
    allRoles.sort((a, b) => a.localeCompare(b))
    send.standardResponse(msg, allRoles.join('\n'), info)
  }
}
```
For a command to be valid it needs to be a .js file in the commands directory and must export `getInfo()` and `command()`.
