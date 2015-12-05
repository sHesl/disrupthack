var express = require('express'),
    watson = require('./server/watson'),
    twilio = require('twilio');

var app = express();
process.env.TWILIO_ACCOUNT_SID = 'AC5a7faa72917a998b94a7eaa2e35b76b3';
process.env.TWILIO_AUTH_TOKEN = '7c05dff31faa2c7cc957a3e57526b99e';

app.get('/', function(req, res) {
	res.send(process.env.TWILIO_ACCOUNT_SID + ' / ' + process.env.TWILIO_AUTH_TOKEN);
});

app.post('/twilio', function(request, response) {
     
    var twiml = new twilio.TwimlResponse();
    console.log('not params' + request.body);
    console.log('params' + request.params.body);
    var textBody = watson.getHealthCareAdvice();
    twiml.message(textBody);

    response.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    
    response.end(twiml.toString());
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));