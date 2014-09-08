var _ = require('underscore');
exports.Notifier = {
    updatePlayers: function(room){
        _.each(room.players, function(user, playerIndex){
            //if !"otherPlayer".grid.hasLivingShips => display win screen, display lose screen for other player
            user.socket.write(JSON.stringify({
                event: "update",
                data: {
                  'myGrid' :user.player.grid.getPrivateGrid() ,
                  'oponentGrid' : room.getOtherPlayer(user).player.getPubliceGrid()
                }
            }));
        });
    }
};
