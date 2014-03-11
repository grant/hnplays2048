hnplays2048
===========

A multiplayer version of 2048 (https://github.com/gabrielecirulli/2048)

Live version: http://hnplays2048.herokuapp.com

## Setup

Local:

```
git clone git@github.com:grant/hnplays2048.git
npm install
node app
```

Publishing:

```
git clone git@github.com:grant/hnplays2048.git
npm install
heroku create
heroku labs:enable websockets
git push heroku master
heroku open
```

## TODO
- Right now the multiplayer version just sends messages of what moves are pressed to every online user. We want to make this more like "Twitch plays pokemon" so we need to have the server have the state of the game and then have users change that state.
  - Basically move the game to server side
