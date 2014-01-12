'use strict';

/* Controllers */

var claytoControllers = angular.module('clayto.controllers', []);

claytoControllers.controller(
    'PhotoCtrl',
    ['$scope', '$routeParams',
        function() {
            $scope.photo = "SINGLE PHOTO";
        }
    ]
);

claytoControllers.controller(
    'PhotoGalleryCtrl',
    ['$scope', '$routeParams', '$http',
        function($scope, $routeParams, $http) {
            $http({
                method: 'GET',
                url: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=cbb428f4219002d668365db2ce3274b1&photoset_id=72157639704760704&format=json&nojsoncallback=1&auth_token=72157639698202766-fce1793135264904&api_sig=50925e0302aa867ae5b6c0395beea930'}).
                success( function (data, status, headers, config) {
                    $scope.photos = data.photoset;
                }).
                error( function (data, status, headers, config) {
                });
        }
    ]
);
