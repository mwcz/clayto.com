/*globals angular, NProgress*/
/*jshint browser: true*/

(function () {
    'use strict';

    /* Controllers */

    var claytoControllers = angular.module('clayto.controllers', []);

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
            flickr_get_image_url.SIZES[size],
            '.jpg'].join('');
    }

    flickr_get_image_url.SIZES = {
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
        ['$scope', '$timeout', '$interval', 'Photoset',
            function ($scope, $timeout, $interval, Photoset) {
                // Get the list of photos in clayto.com photoset

                $scope.photos = [];
                $scope.current_photo = 0;

                Photoset.get({}, function(photoset) {

                    var photos, i, redirect_delay, redirect_tick;

                    if (photoset.stat === "fail") {
                        redirect_delay = 5000; // ms
                        redirect_tick = 1000; // ms
                        i = 0;
                        $scope.flickr_fail = true;

                        NProgress.configure({ showSpinner: false });
                        NProgress.start();
                        $interval( function() {
                            i += 1;
                            NProgress.set(i / (redirect_delay / redirect_tick) );
                        }, redirect_tick );
                        $timeout( function() {
                            window.location = "http://www.flickr.com/mwcloud";
                        }, redirect_delay );
                    } else {
                        photos = photoset.photoset.photo;
                        i = 0;

                        // Now get the URLs to the JPG image for each photo
                        for (i = 0; i < photos.length; i += 1) {
                            $scope.photos.push({
                                title: photos[i].title,
                                img: flickr_get_image_url(photos[i], 940),
                            });
                        }

                        // When the current photo changes, pre-cache the previous
                        // and next photos, and $scope.current_photo from going
                        // below zero or over the maximum number of photos.
                        $scope.$watch('current_photo', function(new_index, old_index, scope) {
                            var over  = scope.current_photo > scope.photos.length;
                            var under = scope.current_photo < 0;
                            // TODO re-add precaching
                            if (under) {
                                scope.current_photo = 0;
                            } else if (over) {
                                scope.current_photo = scope.photos.length;
                            }
                        });
                    }

                });
            }
        ]
    );

}());
