var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

io.configure('production', function(){
  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', 1);                    // reduce logging
  // enable all transports (optional if you want flashsocket)
  io.set('transports', [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
});

var port = process.env.PORT || 8000;
server.listen(port);
console.log("Listening at port: " + port);

// Routes
app.get('/api', function (req, res) {
  var data = game.getGameData();
  data.highscores = game.getScores();
  data.moveCount = moveCount;
  data.numUsers = io.sockets.clients().length; // Online users
  data.totalNumUsers = nextUserId; // Visitor count
  res.send(data);
});
app.get('*', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Setup game
var nextUserId = 0;
var moveCount = 0;
var game = require('./private/js/game');

var voteTime = 10;
var playersMoved;
var votes;
var currentVoteTime;
function resetVotes() {
  playersMoved = {};
  votes = {0: 0, 1: 0, 2: 0, 3: 0};
  currentVoteTime = voteTime;
}

resetVotes();
setInterval(function() {
    io.sockets.emit('timer', currentVoteTime + " second" + (currentVoteTime == 1 ? "" : "s"));
    currentVoteTime--;
    if (currentVoteTime >= 0)
        return;

    var winningCount = 0;
    var winningDir = null;
    for (var dir in votes) {
        if (votes[dir] > 0 && (winningDir == null || winningCount == 0)) {
            winningDir = dir;
            winningCount = votes[dir];
        }
    }
    if (winningDir) {
      ++moveCount;
      game.move(winningDir);

      // Send the move with the game state
      var gameData = game.getGameData();
      var data = {
        direction: winningDir,
        numVotes: winningCount,
        numUsers: io.sockets.clients().length,
        gameData: gameData
      };
      io.sockets.emit('move', data);

      // Reset the game if it is game over or won
      if (gameData.over || gameData.won) {
        game.restart(function () {
          var data = game.getGameData();
          data.highscores = game.getHighscores();
          io.sockets.emit('restart', data);
        });
      }

    }
    resetVotes();
    io.sockets.emit('vote', votes);
},
1000);

io.sockets.on('connection', function (socket) {
  socket.userId = ++nextUserId;

  // When connecting
  var gameData = game.getGameData();
  var data = {
    userId: socket.userId,
    gameData: gameData,
    numUsers: io.sockets.clients().length,
    highscores: game.getHighscores()
  };
  socket.emit('connected', data);
  socket.broadcast.emit('someone connected', {
    numUsers: io.sockets.clients().length
  });

  socket.emit('vote', votes);


  socket.on('move', function (direction) {
    // Keep track of events
    if (playersMoved[socket.userId]) {
        return;
    }
    playersMoved[socket.userId] = true;
    votes[direction] = votes[direction] ? votes[direction] + 1 : 1;

    io.sockets.emit('vote', votes);

  });

  socket.on('disconnect', function () {
    io.sockets.emit('someone disconnected', {
      numUsers: io.sockets.clients().length,
    });
  });
});
