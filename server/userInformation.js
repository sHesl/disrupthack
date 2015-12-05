var http = require('http');

exports.getAllUserInfo = function(req, res){
	var location = req.params.location;
	
	console.log(location);
	
	res.end('{successful : true}');
};

exports.getUserData = function(req, res){
	var userID = req.params.userID;
	
	console.log(userID);
	
	res.end('{successful : true}');
};
