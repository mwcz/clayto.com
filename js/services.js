(function () {
    'use strict';

    /* Services */

    var claytoServices = angular.module('clayto.services', ['ngResource']);

    var flickr_clayto_photoset = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=522454d4d32900b5b28dae598daab260&photoset_id=72157639704760704&format=json&nojsoncallback=1';

    claytoServices.factory(
        'Photoset',
        function ($resource) {
            return $resource(flickr_clayto_photoset, {}, {});
        }
    );

    claytoServices.factory(
        'Palette',
        function ($resource, $http) {
            var palette_request = $http.get('palettes.json');
            var return_data;

            palette_request.success(function (data, status, headers, config) {
                return_data = data;
            });

            palette_request.error(function (data, status, headers, config) {
                return_data = data;
            });

            //return return_data;
            return $resource('palettes.json');
        }
    );

}());
