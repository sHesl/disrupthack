module.exports = {
	sendText: sendText,
	recieveText: recieveText
}

var client = require('twilio')('AC5a7faa72917a998b94a7eaa2e35b76b3', '7c05dff31faa2c7cc957a3e57526b99e');

function sendText(toNumber, textBody) {

	client.sendMessage({
	    to: toNumber,
	    from: '+441547220127',
	    body: textBody
	}, function(err, responseData) {
		console.log('successfully sent ' + textBody + ' to ' + '+441547220127');
	    if (!err) {
	    	console.log('error occured sending message \'' + responseData.body + '\' to ' + responseData.to);
	    }
	});
}

function recieveText() {
}
