var express = require('express'),
    main = require('./server/main'),
    twilio = require('./server/twilio');

var app = express();

app.get('/', function(req, res) {
	res.send('Hello world');
}); 

app.listen(3000);
console.log('Listening on port 3000...');