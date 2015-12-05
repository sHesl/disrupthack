var express = require('express'),
	bodyparser = require('body-parser'),
    main = require('./server/main'),
    twilio = require('twilio');

var app = express();

app.use(bodyparser.json);
app.use(bodyparser.urlencoded({ extended: true }));

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

app.listen(3000);
console.log('Listening on port 3000...');