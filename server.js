var express = require('express'),
	bodyparser = require('body-parser'),
    main = require('./server/main'),
    twilio = require('./server/twilio');

var app = express();

app.use(bodyparser.json);
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send('Hello world');
}); 

app.get('/textGeorge', function(req, res) {
	twilio.sendText('+447756068326', 'hello George :)');
}); 

app.post('/twilio', function(req, res) {
	twilio.recieveText(req, res);
});

app.listen(3000);
console.log('Listening on port 3000...');