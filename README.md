# Simple Discord Bot [![Build Status](https://travis-ci.org/Hoi15A/simple-discord-bot.svg?branch=master)](https://travis-ci.org/Hoi15A/simple-discord-bot)
Just a simple bot with some random functions

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


## Running the bot
### Simple
Just run `npm install` and start with `npm start`

### Using docker
Requirements:
- Docker
- Docker-compose

Then simply run `npm run docker-build` to create the image (can be used to recreate after updates)

`npm run docker-down` to stop the bot<br>
`npm run docker-up` to start it again
