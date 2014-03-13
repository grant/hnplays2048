hnplays2048
===========

A "Twitch plays pokemon" version of 2048 (https://github.com/gabrielecirulli/2048)

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

Developing:

```
node app
shell shell/sass.sh
```