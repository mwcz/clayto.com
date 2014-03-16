/*globals angular, NProgress*/
/*jshint browser: true*/

(function () {
    'use strict';

    /* Controllers */

    var claytoControllers = angular.module('clayto.controllers', []);

    // Photo URL building rules and size characters acquired at:
    // http://www.flickr.com/services/api/misc.urls.html
    function flickr_get_image_url (photo, size) {
        return ("http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + flickr_get_image_url.SIZES[size] + ".jpg");
    }

    flickr_get_image_url.SIZES = {
         75        : '_s',
        150        : '_q',
        100        : '_t',
        240        : '_m',
        320        : '_n',
        500        : '',
        640        : '_z',
        800        : '_c',
        940        : '_b',
        'original' : '_o'
    };

    function pre_cache(image) {
        image.img = image.lazy_img;
    }

    function pre_cache_adjacent(scope, count) {
        var i, current;
        for (i = -count; i <= count; i += 1) {
            current = scope.current_photo + i;
            if (current >= 0 && current < scope.photos.length) {
                pre_cache(scope.photos[scope.current_photo + i]);
            }
        }
    }

    claytoControllers.controller(
        'PhotoGalleryCtrl',
        function ($scope, $timeout, $interval, Photoset, Palette) {
            // Get the list of photos in clayto.com photoset

            $scope.photos = [];
            $scope.current_photo = 0;

            $scope.prev = function () {
                $scope.current_photo -= 1;
            };

            $scope.next = function () {
                $scope.current_photo += 1;
            };

            Photoset.get({}, function(photoset) {

                var photos, i, redirect_delay, redirect_tick;

                // If flickr's API returns an error...
                if (photoset.stat === "fail") {

                    redirect_delay = 5000; // ms
                    redirect_tick = 1000; // ms

                    i = 0;
                    $scope.flickr_fail = true; // error message ngShow's this

                    // Show a progress bar, redirect to flickr.com when done
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
                            lazy_img: flickr_get_image_url(photos[i], 940),
                            img: "",
                            palette: [
                                [ 39, 36, 37 ],
                                [ 255, 255, 255 ],
                                [ 254, 254, 254 ]
                            ]
                        });
                    }

                    // When the current photo changes, pre-cache the previous
                    // and next photos, and $scope.current_photo from going
                    // below zero or over the maximum number of photos.
                    $scope.$watch('current_photo', function(new_index, old_index, scope) {

                        var over  = scope.current_photo >= scope.photos.length;
                        var under = scope.current_photo < 0;

                        if (under) {
                            scope.current_photo = 0;
                        } else if (over) {
                            scope.current_photo = scope.photos.length - 1;
                        }

                        var cache_adjacent = 2;  // how many adjacent images to pre-cache

                        // pre-cache this number of images to the left and
                        // right of the current photo
                        pre_cache_adjacent(scope, cache_adjacent);

                        Palette.get({}, function(palettes) {
                            var bg, border;

                            try {
                                // try to pull out backgroundand border
                                bg = palettes[photos[scope.current_photo].title].background;
                                border = palettes[photos[scope.current_photo].title].border;
                            } catch (e) {
                                // otherwise, defaults
                                bg     = '#1f1f1f';
                                border = '#999';
                            }

                            document.body.style.backgroundColor = bg;
                            document.querySelector('nav').style.borderColor = border;
                            document.querySelector('footer').style.borderColor = border;
                            document.querySelectorAll('.photo-container img')[scope.current_photo].style.outlineColor = border;
                        });
                    });
                }
            });
        }
    );

}());
