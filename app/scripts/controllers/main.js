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
        $scope.message = 'Hello World!';
        var address = '1600+Amphitheatre+Parkway,+Mountain+View,+CA';
        
        $http({
            method : 'GET',
            url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+ address +'&key=AIzaSyDPemc_No5ae1c9PlCvchMq16ceDrb9Ed0'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('error');
            console.log(response);
        });
        
        function initializeMap() {
            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: new google.maps.LatLng(44.5403, -78.5463),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
        }
        
        initializeMap();
    });