'use strict';

/**
 * @ngdoc function
 * @name recipeAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the recipeAppApp
 */
angular.module('mainApp')
    .controller('MainCtrl', function($scope, $http) {
        $scope.peopleInNeed = [];
        
        navigator.geolocation.getCurrentPosition(initApp);
        
        function initApp(location){
            initializeMap(location.coords.latitude, location.coords.longitude);
        }
        
        function initializeMap(lat, lng) {
            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            // dropPinOnMap(map, lat, lng); //this drops a pin on your current location
            getAllUsersList(map);
        }
        
        function getAllUsersList(map){
            $http({
                method : 'GET',
                url : '/getAllUserInfo/local'
            }).then(function successCallback(response){
                $scope.peopleInNeed = response.data.data;
                dropAllPins(map);
                console.log($scope.peopleInNeed);
            }, function errorCallback(response) {
                console.log('error');
                console.log(response);
            });
        }
        
        function addressToCoords(map, address, callback){
            $http({
                method : 'GET',
                url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+ address +'&key=AIzaSyDPemc_No5ae1c9PlCvchMq16ceDrb9Ed0'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                var location = response.data.results[0].geometry.location;
                var locObject = {
                    'lat' : location.lat,
                    'lng' : location.lng
                };
                
                callback(map, locObject);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('Something went wrong. Returning default coords');
                var locObject = {
                    'lat' : 44.5403,
                    'lng' : -78.5463
                };
                
                callback(locObject);
            });    
        }
        
        function pinsCallback(map, object){
            dropPinOnMap(map, object.lat, object.lng);
        }
        
        function dropAllPins(map){
            for(var i=0; i<$scope.peopleInNeed.length;i++){
                addressToCoords(map, $scope.peopleInNeed[i].LOCATION, pinsCallback);
            }
        }
        
        function dropPinOnMap(map, lat, lng){
            var contentString = '<input onclick="changeHandler()" id="callPatientBtn" type="button" data-doctor="+447756068326" data-patient="+447941147361" value="Call Patient">';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
  
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            });
            
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
            
            // $scope.peopleInNeed.push(marker);
        }
    });
    
    function changeHandler(){
        var button = document.getElementById('callPatientBtn');
        var doctorNumber = button.getAttribute('data-doctor');
        var patientNumber = button.getAttribute('data-patient');
        
        var xmlhttp = new XMLHttpRequest();

        var url = 'https://warm-harbor-4491.herokuapp.com/call';
        var params = 'doctorsNumber=' + doctorNumber + '&patientsNumber=' + patientNumber;
        xmlhttp.open('POST', url, true);
        
        //Send the proper header information along with the request
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // xmlhttp.setRequestHeader('Content-length', params.length);
        // xmlhttp.setRequestHeader('Connection', 'close');
        
        xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log(xmlhttp.responseText);
            }
        };
        
        xmlhttp.send(params);
        
        console.log(doctorNumber + ' ' + patientNumber);
    };