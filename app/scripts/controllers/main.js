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
        var address = '30 Park Hill, W5 2JN';
        $scope.peopleInNeed = [];
        
        navigator.geolocation.getCurrentPosition(initApp);
        
        function initApp(location){
            initializeMap(location.coords.latitude, location.coords.longitude);
        }
        
        function initializeMap(lat, lng) {
            console.log('lat = '+lat+' lng = '+lng);
            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            dropPinOnMap(map, lat, lng);
        }
        
        function addressToCoords(address){
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
                
                return locObject;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('Something went wrong. Returning default coords');
                var locObject = {
                    'lat' : 44.5403,
                    'lng' : -78.5463
                };
                return locObject;
            });    
        }
        
        function dropPinOnMap(map, lat, lng){
            var contentString = '<h1>Hello funky message</h1>';
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
            
            $scope.peopleInNeed.push(marker);
        }
        
        
    });