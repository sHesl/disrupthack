var http = require('http');

module.exports = {
	getHealthCareAdvice: getHealthCareAdvice
}

var watsonUrl = 'http://disruptlondon2015.appspot.com/?text=';

function getHealthCareAdvice(twilioPostBody, cb) {
	var watsonRequest = watsonUrl + twilioPostBody.Body + '&number=' + twilioPostBody.From;
	console.log(watsonRequest);

	http.get(watsonRequest, function(watsonReponse) {
	  var str = '';

	  watsonReponse.on('data', function(chunk) {
	    str += chunk;
	  });

	  watsonReponse.on('end', function() {
	    cb(str);
	  });

	});
}