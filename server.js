var express = require('express'),
    main = require('./server/main'),
    twilio = require('twilio');

var app = express();
process.env.TWILIO_AUTH_TOKEN = '7c05dff31faa2c7cc957a3e57526b99e';

app.get('/', function(req, res) {
	res.send(process.env.TWILIO_AUTH_TOKEN);
});

app.post('/twilio', twilio.webhook({
    url:'https://warm-harbor-4491.herokuapp.com/twilio',
    protocol: 'https'
}), function(request, response) {
    var twiml = new twilio.TwimlResponse();
    twiml.message('This HTTP request came from Twilio!');
    response.send(twiml);
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));