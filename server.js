var express = require('express'),
    bodyParser = require('body-parser'),
    watson = require('./server/watson'),
    main = require('./server/main'),
    userInfo = require('./server/userInformation'),
    path = require('path'),
    twilio = require('twilio');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
process.env.TWILIO_ACCOUNT_SID = 'AC5a7faa72917a998b94a7eaa2e35b76b3';
process.env.TWILIO_AUTH_TOKEN = '7c05dff31faa2c7cc957a3e57526b99e';

app.use(express.static(path.join(__dirname, '/app')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/', function(req, res) {
    res.send(process.env.TWILIO_ACCOUNT_SID + ' / ' + process.env.TWILIO_AUTH_TOKEN);
});

app.route('/getAllUserInfo/:location')
    .get(userInfo.getAllUserInfo);

app.route('/getUserData/:userID')
    .get(userInfo.getUserData);

app.post('/conferenceRoom', function(request, response) {
    var twiml = new twilio.TwimlResponse();
    console.log('creating conference call room ' + request.query.room);

    twiml.dial(function(node) {
        node.conference(request.query.room);
    });

    response.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    
    response.end(twiml.toString());
});

app.post('/call', function(request, res) {
    var doctorsNumber = '+447756068326';
    var patientsNumber = '07941147361';
    var twilioNumber = '+441547220127';

    var conferenceCallInfo =
        'https://warm-harbor-4491.herokuapp.com/conferenceRoom?room=test';

    twilioClient.makeCall({
        to: patientsNumber,
        from: twilioNumber,
        url: conferenceCallInfo
    }, function(err, responseData) {
        console.log(err);
        console.log(responseData.from);
    });

    twilioClient.makeCall({
        to: doctorsNumber,
        from: twilioNumber,
        url: conferenceCallInfo
    }, function(err, responseData) {
        console.log(err);
        console.log(responseData.from);
    });

    res.send('calls made');
});

app.post('/twilio', function(request, response) {
     
    var twiml = new twilio.TwimlResponse();

    watson.getHealthCareAdvice(request.body, function(result) {
        twiml.message(result);

        response.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        
        response.end(twiml.toString());
    });
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));