/*globals angular*/
/*jshint browser: true*/

(function () {
    'use strict';


    // Declare app level module which depends on filters, and services
    window.clayto = angular.module('clayto', [
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'clayto.services',
        'clayto.controllers'
    ]).
    config(
        ['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

        // Configure routes
        $routeProvider.when('/', {templateUrl: 'partials/photo.html', controller: 'PhotoGalleryCtrl'});
        $routeProvider.when('/photo/:photoId', {templateUrl: 'partials/photo.html', controller: 'PhotoCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});

        // Cache every http request
        $httpProvider.defaults.cache = true;

    }]);

}());
