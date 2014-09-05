var Grid = require('grid.js');
exports.Player = function(sock){
    this.socket = sock;
    this.grid = new Grid();
};
