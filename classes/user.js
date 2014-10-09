var helpers = require('../helpers.js');
var player = require('./player.js');
var User = function(sock){

    /**
     * A unique identifier for the user
     *
     * @type {*}
     */
	this.id = helpers.generateRandomString();

    /**
     * This user's socket connection
     *
     * @type {*}
     */
    this.socket = sock;

    /**
     * The room this player is playing in, if he is not playing, then null
     *
     * @type {null}
     */
    this.roomId = null;

    /**
     * If the user is playing, this should be his player info
     * @type {null|Player}
     */
    this.player = new player.Player(sock);
};

exports.User = User;
