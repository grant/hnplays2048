var socket = io.connect();
socket.on('connected', function (data) {
  // var userId = data.userId;
  var gameData = data.gameData;
  manager.setGameData(gameData);
});

socket.on('move', function (data) {
  // manager.move(data, true);
  // var direction = data.direction;
  // var userId = data.userId;
  if (!manager.over) {
    var gameData = data.gameData;
    manager.setGameData(gameData);
  }
});

socket.on('restart', function (gameData) {
  manager.restart();
  manager.setGameData(gameData);
});

var Multiplayer = {
  move: function (direction) {
    socket.emit('move', direction);
  }
};