// The server-side game

// Requires
var GameManager = require('./game_manager');

var gameManager = new GameManager(4);

// External API
module.exports = {

  // Game move
  move: function (direction) {
    gameManager.move(direction);
  },

  // Gets the game state data
  getGameData: function () {
    return gameManager.getGameData();
  }
};