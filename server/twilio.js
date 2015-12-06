var twilio = require('twilio'),
	watson = require('./watson');

process.env.TWILIO_ACCOUNT_SID = 'AC5a7faa72917a998b94a7eaa2e35b76b3';
process.env.TWILIO_AUTH_TOKEN = '7c05dff31faa2c7cc957a3e57526b99e';

var twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
	getTwilioConfig: getTwilioConfig,
	createConferenceCallRoom: createConferenceCallRoom,
	connectDoctorAndPatient: connectDoctorAndPatient,
	sendMedicalAdvice: sendMedicalAdvice
}

function getTwilioConfig(req, res) {
	res.send(process.env.TWILIO_ACCOUNT_SID + ' / ' + process.env.TWILIO_AUTH_TOKEN);
}

function createConferenceCallRoom(req, res) {
	var twiml = new twilio.TwimlResponse();
	var uniqueConfRoom = req.query.room;
    console.log('creating conference call room ' + uniqueConfRoom);

    twiml.dial(function(node) {
        node.conference(uniqueConfRoom);
    });

    res.writeHead(200, { 'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}

function connectDoctorAndPatient(req, res) {
    var doctorsNumber = req.body.doctorsNumber;
    var patientsNumber = req.body.patientsNumber;
    var twilioNumber = '+441547220127';

    var uniqueRoomName = parseInt(doctorsNumber).toString() + parseInt(patientsNumber).toString();
    var conferenceCallRoom = 'https://warm-harbor-4491.herokuapp.com/conferenceRoom?room=' + uniqueRoomName;

    twilioClient.makeCall({
        to: patientsNumber,
        from: twilioNumber,
        url: conferenceCallRoom
    }, function(err, responseData) {
        if (err) {
    		console.log(err);
        	console.log(responseData.from);
    	}
    });

    twilioClient.makeCall({
        to: doctorsNumber,
        from: twilioNumber,
        url: conferenceCallRoom
    }, function(err, responseData) {
    	if (err) {
    		console.log(err);
        	console.log(responseData.from);
    	}
    });

    res.send('connecting ' + doctorsNumber + ' to ' + patientsNumber);
}

function sendMedicalAdvice(req, res) {
    var twiml = new twilio.TwimlResponse();

    watson.getHealthCareAdvice(req.body, function(result) {
        twiml.message(result);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });
}