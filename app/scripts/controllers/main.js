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
            // $http({
            //     method : 'GET',
            //     url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+ address +'&key=AIzaSyDPemc_No5ae1c9PlCvchMq16ceDrb9Ed0'
            // }).then(function successCallback(response) {
            //     // this callback will be called asynchronously
            //     // when the response is available
            //     var location = response.data.results[0].geometry.location;
            //     console.log(response);
            //     initializeMap(location.lat, location.lng);
            // }, function errorCallback(response) {
            //     // called asynchronously if an error occurs
            //     // or server returns response with an error status.
            //     console.log('error');
            //     console.log(response);
            //     initializeMap(44.5403, -78.5463);
            // });    
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
        
        function dropPinOnMap(map, lat, lng){
            $scope.peopleInNeed.push(new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map
            }));
        }
        
        
    });