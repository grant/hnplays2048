var moveList = document.getElementsByClassName("inputlist")[0];
var highscores = document.getElementsByClassName("scorelist")[0];
var arrows = ['▲', '▶', '▼', '◀'];
var MOVE_LIST_CUTOFF = 20;

var socket = io.connect();
socket.on('connected', function (data) {
  // var userId = data.userId;
  var gameData = data.gameData;
  manager.setGameData(gameData);
});

socket.on('move', function (data) {
  // Add move to input list
  var direction = data.direction;
  var userId = data.userId;
  var moveElement = document.createElement('li');
  moveElement.innerHTML = '<span class="move move-'+direction+'">' + arrows[direction] + '</span>User ' + userId;
  moveList.insertBefore(moveElement,moveList.firstChild);

  // Remove input list item if there are too many
  var moveListLen = moveList.childNodes.length;
  if (moveListLen > MOVE_LIST_CUTOFF) {
    for (var i = MOVE_LIST_CUTOFF; i < moveListLen; ++i) {
      moveList.removeChild(moveList.childNodes[i]);
    }
  }

  // Set the game state
  if (!manager.over) {
    var gameData = data.gameData;
    manager.setGameData(gameData);
  }
});

socket.on('restart', function (gameData) {
  manager.restart();
  manager.setGameData(gameData);
});

// Yes, this is in the global scope.
var Multiplayer = {
  move: function (direction) {
    socket.emit('move', direction);
  }
};