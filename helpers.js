var findRoomByUserId = function(id){

};
var generateRandomString = function(size){
	size = size || 8;
	var chars = "1234567890qwertyuiopasdfghjklzxcvbnm";
	var string = "";
	for(var i=0;i<size;i++){
		string += chars[(parseInt(Math.random()*100)%chars.length)];
	}
	return string;
};

exports.findRoomByUserId     = findRoomByUserId;
exports.generateRandomString = generateRandomString;
