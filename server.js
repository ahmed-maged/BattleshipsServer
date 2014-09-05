var net = require('net');
var _ = require('underscore');

var HOST = 'localhost';
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
var rooms = {};

var notifier = require("./notifier.js");

try{
    net.createServer(function(sock) {
        try{
            console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
            var user = new User(sock);

            sock.on('close', function(data) {
                try{
                    console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
                    //todo if this sock is in waitingPlayers, remove it
                }
                catch(e){console.log(e);}
            });
            //We should do something on connect like, maybe if there is a waiting player, we can suggest to this guy to start playing

            sock.on('data', function(data) {
                data = "" +data; //hack to parse data to string until i can understand how the heck i am supposed to deal with it
                data = JSON.parse(data);
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
    /**
     * Logic:
     *  if there are no waiting player, then wait.
     *  else:
     *   1.create new room
     *   2.add this player and the waitingPlayer to the room
     *   3.add the room id to each player
     *   4.add the room to the rooms container
     *
     * @param data should always contain a user which should be an instance of User
     */
    start: function(data){
        if(waitingPlayers.length){
            console.log("WOW WE GOT TWO PLAYERS");
            //instantiate the room
            var room = new Room();
            //add the players to the room
            room.players = [
                waitingPlayers.pop(), //the other player
                data.user
            ];
            //fill the room id in the player for easier future reference
            for(var i=0;i<room.players.length;i++){
                room.players[i].roomId = room.id;
            }
            //
            rooms[room.id] = room;
            sock.write("start");
        }
        else{
            waitingPlayers.push(data.user);
            console.log("only one player");
        }
    },
    fireAt: function(data){
        var user = data.user;
        var room = rooms[user.roomId];
        var otherPlayer = room.players.getOtherPlayer(user);
        //1.make sure it's this player's turn
        if(room.players.indexOf(otherPlayer) !== room.currentPlayer){
            //return NOT YOUR TURN exception or something
        }
        //2.call "otherPlayer".grid.fireAt(pos);
        otherPlayer.player.grid.fireAt(data.position);

        //3.b. else, change turns
        room.currentPlayer = room.currentPlayer?0:1;
        notifier.updatePlayers(room);
    },
    placeShip: function(data){
        //1.make sure that's a valid call (i.e. game has not started yet)
        //2.call
    },
    exit: function(data){


    }
};
console.log('Server listening on ' + HOST +':'+ PORT);
