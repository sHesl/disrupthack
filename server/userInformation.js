var http = require('http');
var watsonUrl = 'http://disruptlondon2015.appspot.com/';

//get all user data within a specific location
exports.getAllUserInfo = function(req, response){
	var location = req.params.location;
	var watsonRequest = watsonUrl + "getallusers";

	http.get(watsonRequest, function(res) {
		console.log("res.statusCode: ", res.statusCode);
		var str = '';

		res.on('data', function(chunk) {
			str += chunk;
		});

		res.on('end', function() {
			console.log(str);
			console.log("[evfService] Got user info: "+str);
			response.end(str);
		});

	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});


};

exports.getUserData = function(req, response){
	var userID = req.params.userID;
	
	console.log("getUserData user id", userID);

	//get data about a specific user
	var watsonRequest = watsonUrl + "getuserdata/?userid=" + userID;

	http.get(watsonRequest, function(res) {
		console.log("res.statusCode: ", res.statusCode);

		var str = '';
		res.on('data', function(chunk) {
			str += chunk;
		});

		res.on('end', function() {
			console.log("[evfService] Got user info: "+str);
			response.end(str)
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
};
