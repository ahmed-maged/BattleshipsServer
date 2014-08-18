var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

/**
 * A list of all the users currently connected to the app (note: they don't have to be players, they could still be at the home screen)
 */
var users = [];

/**
 * User class used to hold all user's data, used to identify the users
 */
var User = require('classes/user.js');

/**
 * When a player tries to start a game, and there is no one there to play with, he 
 */
var waitingPlayer = null;

/**
 * A List of all the rooms currently in the game, all rooms should be instances of the "Room Class"
 */
var rooms = [];

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    var user = new User(sock);
    users.push(user);

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    //We should do something on connect like, maybe if there is a waiting player, we can suggest to this guy to start playing

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        data = "" +data; //hack to parse data to string until i can understand how the heck i am supposed to deal with it
        data = JSON.parse(data);
        //fire the appropriate handler if it exists
        if(typeof handlers[data.event] == 'function'){
            handlers[data.event](user);
        }
        else{ //handler does not exist, return error
            sock.write('{event:"error","data":"event"'+data.event+' does not exist"}');
        }
    });

}).listen(PORT, HOST);

var handlers = {
    start: function(user){
        if(waitingPlayer){
            var room = new Room();
            room.players = [
                waitingPlayer,
                user
            ];
            room.currentPlayer = 0 //so players.0 will play first, then it will equal 1, etc..
            rooms.push(room);
            waitingPlayer = null; //race condition?
        }
        else{
            waitingPlayer = user;
        }
    },
    fireAt: function(pos){
        //1.make sure it's this player's turn
        //2.call "otherPlayer".grid.fireAt(pos);
        //3.if !"otherPlayer".grid.hasLivingShips => display win screen, display lose screen for other player
        //3.b. else, change turns
    },
    placeShip: function(pos){
        //1.make sure that's a valid call (i.e. game has not started yet)
        //2.call
    },
    exit: function(){

    }
};
console.log('Server listening on ' + HOST +':'+ PORT);