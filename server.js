var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    twilio = require('./server/twilio'),
    userInfo = require('./server/userInformation');

var WebSocketServer = require("ws").Server;
var http = require("http");

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/app')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.route('/getAllUserInfo/:location')
    .get(userInfo.getAllUserInfo);

app.route('/getUserData/:userID')
    .get(userInfo.getUserData);

app.get('/config', twilio.getTwilioConfig);
app.post('/conferenceRoom', twilio.createConferenceCallRoom);
app.post('/call', twilio.connectDoctorAndPatient);
app.post('/twilio', twilio.sendMedicalAdvice);

server.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000);

  console.log('websocket connection open');

  ws.on('close', function() {
    console.log('websocket connection close')
    clearInterval(id)
  })
})