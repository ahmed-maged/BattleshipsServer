var helpers = require('../helpers.js');
var User = function(sock){
	this.id = helpers.generateRandomString();
	this.socket = sock;
	this.roomId = null;
};

exports.User = User;
