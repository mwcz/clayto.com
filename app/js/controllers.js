(function () {
    'use strict';

    /* Controllers */

    var claytoControllers = angular.module('clayto.controllers', []);

    claytoControllers.controller(
        'PhotoCtrl',
        ['$scope', '$routeParams',
            function($scope, $routeParams) {
                $scope.photo = "SINGLE PHOTO";
            }
        ]
    );


    // Photo URL building rules and size characters acquired at:
    // http://www.flickr.com/services/api/misc.urls.html
    function flickr_get_image_url (photo, size) {
        return ['http://farm',
            photo.farm,
            '.staticflickr.com/',
            photo.server,
            '/',
            photo.id,
            '_',
            photo.secret,
            SIZES[size],
            '.jpg'].join('');
    }
    var SIZES = {
         75: '_s',
        150: '_q',
        100: '_t',
        240: '_m',
        320: '_n',
        500: '',
        640: '_z',
        800: '_c',
        940: '_b'
    };


    claytoControllers.controller(
        'PhotoGalleryCtrl',
        ['$scope', 'Photoset',
            function($scope, Photoset) {
                // Get the list of photos in clayto.com photoset

                $scope.photos = [];

                Photoset.get({}, function(photoset) {
                    var photos = photoset.photoset.photo;
                    var i = 0;
                    // Now get the URLs to the JPG image for each photo
                    for (i = 0; i < photos.length; i += 1) {
                        $scope.photos.push({ 
                            title: photos[i].title,
                            img: flickr_get_image_url(photos[i], 940),
                            thumb: flickr_get_image_url(photos[i], 240) 
                        });
                    }
                });
            }
        ]
    );
}());
