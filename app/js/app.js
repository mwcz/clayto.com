(function () {
    'use strict';


    // Declare app level module which depends on filters, and services
    angular.module('clayto', [
        'ngRoute',
        'clayto.filters',
        'clayto.services',
        'clayto.directives',
        'clayto.controllers'
    ]).
    config(
        ['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

        // Configure routes
        $routeProvider.when('/', {templateUrl: 'partials/photo.html', controller: 'PhotoCtrl'});
        $routeProvider.when('/photos', {templateUrl: 'partials/photos.html', controller: 'PhotoGalleryCtrl'});
        $routeProvider.when('/photo/:photoId', {templateUrl: 'partials/photo.html', controller: 'PhotoCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});

        // Cache every http request
        $httpProvider.defaults.cache = true;

    }]);

}());
