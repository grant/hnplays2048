// The server-side game

// Requires
var GameManager = require('./game_manager');

var gameManager = new GameManager(4);
var isResetting = false;

// External API
module.exports = {

  // Game move
  move: function (direction) {
    gameManager.move(direction);
  },

  // Gets the game state data
  getGameData: function () {
    return gameManager.getGameData();
  },

  // Resets the game
  reset: function (callback) {
    if (!isResetting) {
      isResetting = true;
      // Reset the game after a short duration
      setTimeout(function () {
        isResetting = false;
        gameManager.restart();
        callback();
      }, 4000);
    }
  }
};