# Project Erilum
A Discord Bot that I am making... Probably terrible.

# Usage
To use the bot for yourself, please create a file called `config.json` in `\Project Erilum JS Files\` with:
```js
{
  "prefix": "//", //The default prefix for commands - Servers can change their prefix individually afterwards.
  "token": "[discord token here]" //Your Discord App/Bot Token
}
```
Or, invite my bot to your server: https://discord.com/api/oauth2/authorize?client_id=742083665860886587&scope=bot&permissions=8

# `defaultTemplate.json` Info
Any settings you want to add to a server, add to this file and all server files will be updated on the next restart of the Bot.
This updates under `main.js` in the function `doJSONUpdate(server)`.
