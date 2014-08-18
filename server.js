var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var players = [];
var waitingPlayer = null;
var rooms = [];

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

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
            handlers[data.event](sock);
        }
        else{ //handler does not exist, return error
            sock.write('{event:"error","data":"event"'+data.event+' does not exist"}');
        }
    });

}).listen(PORT, HOST);

var handlers = {
    start: function(sock){
        if(waitingPlayer){
            rooms.push({
                players: [
                    waitingPlayer,
                    sock
                ]
            });
            waitingPlayer = null;
            sock.write('joined room with player');
        }
        else{
            waitingPlayer = sock;
        }
    }
};
console.log('Server listening on ' + HOST +':'+ PORT);