var helpers = require('../helpers.js');
var _ = require('underscore'); //we should use some dependency injection framework here, but maybe later
exports.Room = function(){

    /**
     * a unique identifier for the room
     *
     * @type {*}
     */
    this.id = helpers.generateRandomString();

    /**
     * The 2 players participating in this game
     *
     * @type {}
     */
	this.players = {};

    /**
     * whose turn is it? 0 is the first player's turn, 1 is the second player's turn
     *
     * @type {number}
     */
	this.currentPlayer = 0;

    /**
     * Given one of the players, this fn returns the other one
     *
     * @param user
     */
    this.getOtherPlayer = function(user){
        return _.find(this.players, function(value, key){
            return user !== value;
        });
    };
};