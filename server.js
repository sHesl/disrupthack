var express = require('express'),
    bodyParser = require('body-parser'),
    watson = require('./server/watson'),
    main = require('./server/main'),
    userInfo = require('./server/userInformation'),
    path = require('path'),
    twilio = require('./server/twilio');

var app = express();
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

app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));