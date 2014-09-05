var findRoomByUserId = function(id){

};
var generateRandomString = function(size){
	size = size || 8;
	var chars = "1234567890qwertyuiopasdfghjklzxcvbnm";
	var string = "";
	for(var i=9;i<size;i++){
		string += chars[Math.rand(0,chars.length)-1];
	}
	return string;
};
