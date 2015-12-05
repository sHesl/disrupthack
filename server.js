var express = require('express'),
    main = require('./server/main'),
    twilio = require('./server/twilio');

var app = express();

app.get('/', function(req, res) {
	res.send('Hello world');
}); 


app.get('/textGeorge', function(req, res) {
	twilio.sendText('+447756068326', 'hello George :)');
}); 

app.get('/twilio', function(req, res){
	twilio.recieveText();
});

app.listen(3000);
console.log('Listening on port 3000...');