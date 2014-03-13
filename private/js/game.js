// The server-side game

// Requires
var GameManager = require('./game_manager');

var gameManager = new GameManager(4);
var isRestarting = false;

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
  restart: function (callback) {
    if (!isRestarting) {
      isRestarting = true;
      // Restart the game after a short duration
      setTimeout(function () {
        isRestarting = false;
        gameManager.restart();
        callback();
      }, 4000);
    }
  }
};