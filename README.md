![MedicSMS](app/images/medicsmslogo.png)

##Inspiration
Our aim is to allow those in developing countries, with limited or no access to the internet, the same first aid information which is readily available to the world that has easy access to the internet.

##What it does
MedicSMS empowers those in developing countries that have access to ordinary cell phones with the ability to obtain a first aid diagnosis and advice via SMS. Users simply text in their symptoms, and, using a combination of the Twilio and IBM Watson APIs, we translate the natural language SMS into a likely diagnosis. After a quick dialog of decisions, the user is presented with a suggested course of action as a series of steps for their specific condition. We request location information from the user so that the proper local authorities can both contact the aid the patient. Furthermore, location and symptoms data can be provided to local charities to help track the spread of illness and disease in these locations.

##How we built it
The core of MedicSMS is based on the Twilio and IBM Watson APIs. We use Twilio to receive and send SMS messages to our end users, while we use Watson's natural language classifier to classify the symptoms of an individual and then recommend the best course of action. Our two different backend services are written in NodeJS and Python, while our frontend is using AngularJS, Google Maps API and CSS3. Our services are hosted on Heroku and Google App Engine.

Built With
node.js
javascript
python
google-maps
twilio
ibm-watson
google-app-engine
heroku
angular.js
css3

##Try it out
warm-harbor-4491.herokuapp.com