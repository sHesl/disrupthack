var http = require('http');

module.exports = {
	getHealthCareAdvice: getHealthCareAdvice
}

var url = 'http://disruptlondon2015.appspot.com/?text=';

function getHealthCareAdvice(inputText, cb) {

	http.get(url + inputText, function(watsonReponse) {
	  var str = '';

	  watsonReponse.on('data', function(chunk) {
	    str += chunk;
	  });

	  watsonReponse.on('end', function() {
	    cb(str);
	  });

	});
}