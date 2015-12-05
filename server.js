var express = require('express'),
    main = require('./server/main'),
    twilio = require('twilio');

var app = express();
app.set('TWILIO_ACCOUNT_SID', 'AC5a7faa72917a998b94a7eaa2e35b76b3');
app.set('TWILIO_AUTH_TOKEN', '7c05dff31faa2c7cc957a3e57526b99e');

app.get('/', function(req, res) {
	res.send('Hello world');
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