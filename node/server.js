var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

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
        console.log(typeof data);
        data = JSON.parse(data);
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        switch(data.event){
            case "start":
                if(waitingPlayer){
                    rooms.push({
                        players: [
                            waitingPlayer,
                            sock
                        ]
                    });
                    waitingPlayer = null;
                    sock.write('joined room with player');
                    console.log('rooms:');
                    console.log(rooms);
                }
                else{
                    waitingPlayer = sock;
                    console.log('added waiting player for: ');
                    console.log(sock.remoteAddress);
                }
                break;
            default:
                sock.write('{event:"error","data":"event"'+data.event+' does not exist"}');
        }
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');

    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);