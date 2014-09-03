var net = require('net');

var HOST = '192.168.1.116';
var PORT = 6969;

/**
 * A list of all the users currently connected to the app (note: they don't have to be players, they could still be at the home screen)
 */
var users = [];

/**
 * User class used to hold all user's data, used to identify the users
 */
var User = require('./classes/user.js');

/**
 * When a player tries to start a game, and there is no one there to play with, he will be put in waitingPlayers
 */
var waitingPlayers = [];

/**
 * A List of all the rooms currently in the game, all rooms should be instances of the "Room Class"
 */
var rooms = [];

try{
    net.createServer(function(sock) {
        try{
            console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
            var user = new User(sock);
            // Add a 'close' event handler to this instance of socket
            sock.on('close', function(data) {
                try{
                    console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
                }
                catch(e){console.log(e);}
            });
            //We should do something on connect like, maybe if there is a waiting player, we can suggest to this guy to start playing
            sock.on('data', function(data) {
                data = "" +data; //hack to parse data to string until i can understand how the heck i am supposed to deal with it
                console.log(data);
                sock.write('data received successfully, ya brens.');
                data = JSON.parse(data);
                console.log(data);

                data.user=user;
                //fire the appropriate handler if it exists
                if(typeof handlers[data.event] == 'function'){
                    handlers[data.event](data);
                }
                else{ //handler does not exist, return error
                    sock.write('{event:"error","data":"event"'+data.event+' does not exist"}');
                }
            });

        }
        catch(e){console.log(e);
        }

    }).listen(PORT, HOST);


}catch(e){console.log(e);}

var handlers = {
    start: function(data){
        if(waitingPlayers.length){
            console.log("WOW WE GOT TWO PLAYERS");
            var room = new Room();
            room.players = [
                waitingPlayers.pop(),
                data.user
            ];
            room.currentPlayer = 0; //so players.0 will play first, then it will equal 1, etc..
            rooms.push(room);
            sock.write("start");
        }
        else{
            waitingPlayers.push(data.user);
            console.log("only one player");
        }
    },
    fireAt: function(data){
        //1.make sure it's this player's turn
        //2.call "otherPlayer".grid.fireAt(pos);
        //3.if !"otherPlayer".grid.hasLivingShips => display win screen, display lose screen for other player
        //3.b. else, change turns
    },
    placeShip: function(data){
        //1.make sure that's a valid call (i.e. game has not started yet)
        //2.call
    },
    exit: function(data){


    }
};
console.log('Server listening on ' + HOST +':'+ PORT);
