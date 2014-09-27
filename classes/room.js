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
     * Note: it actually contains objects of User class not Player class
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
     * Given the user, this fn returns the player
     *
     * @param user
     */
    this.getThisPlayer = function(user){
        return _.find(this.players, function(value, key){
            return user === value;
        });
    };

    /**
     * Given the user, this fn returns his index in room.players
     *
     * @param user
     * @throws exception
     */
    this.getThisPlayersIndex = function(user){
        var index = null;
        _.each(this.players, function(elem, key, list){
            if(elem===user) index = key;
        });
        if(null === index){
            throw "Player not found!";
        }
        return index;
    };

    /**
     * Given one of the user, this fn returns the player for the other user
     *
     * @param user
     */
    this.getOtherPlayer = function(user){
        return _.find(this.players, function(value, key){
            return user !== value;
        });
    };
};