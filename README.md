# Simple Discord Bot [![Build Status](https://travis-ci.org/Hoi15A/simple-discord-bot.svg?branch=master)](https://travis-ci.org/Hoi15A/simple-discord-bot)
This bot was created as an idea by Austin on February 10th and has been active since then.

## Setup
Create a `.env` file and set the following values:
```
DISCORD_TOKEN=
PREFIX=
REPO_BASE_URL=https://github.com/Hoi15A/simple-discord-bot
EMBED_COLOUR=<hex colour code>
BOT_OWNERS=<user Id's>
BOT_ADMIN_ROLES=<role Id's>
```
You can enter multiple values for owner and admin roles, separate them with `,`

## Adding your own commands
to add your own command use the following command template:
```js
module.exports = {
  getInfo: function () {
    var info = {
      'name': 'your command name',
      'permissionLevel': 'everyone for everyone, admin for bot admins, owner for just yourself'
      'enabled': true // if you want the command enabled, false if you don't
    }
    return info
  },

  command: function (msg, params) {
  // do what you want here
  }
}
```  
Make sure if you're making a command to only make it in the commands directory and not anywhere else

## Running the bot
### Using node
Just run `npm install` and start with `npm start`

### Using pm2
Requirements: 
- pm2
Install the pm2 client by using `npm i pm2 -g` 
start the bot with pm2 using `pm2 start index.js`
to stop the bot use `pm2 stop index.js`
and to restart the bot use `pm2 restart index.js`

### Using docker
Requirements:
- Docker
- Docker-compose

Then simply run `npm run docker-build` to create the image (can be used to recreate after updates)

`npm run docker-down` to stop the bot<br>
`npm run docker-up` to start it again
