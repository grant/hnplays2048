hnplays2048
===========

A "Twitch Plays Pokemon" version of 2048.

* Live version: http://hnplays2048.herokuapp.com
* API: http://hnplays2048.herokuapp.com/api
* Tweeted by Gabriele Cirulli: https://twitter.com/gabrielecirulli/statuses/444183831097397248
* Featured on the top of HN on March 19, 2014.

<img width="916" alt="Screenshot 2025-02-01 at 19 58 24" src="https://github.com/user-attachments/assets/69a20eff-1a6d-40de-88b1-3009bcc1c718" />

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
git push heroku master
heroku open
```

Developing:

```
node app
shell shell/sass.sh
```
