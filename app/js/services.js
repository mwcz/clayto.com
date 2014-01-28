(function () {
    'use strict';

    /* Services */

    var claytoServices = angular.module('clayto.services', ['ngResource']);

    var flickr_clayto_photoset = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=522454d4d32900b5b28dae598daab260&photoset_id=72157639704760704&format=json&nojsoncallback=1';

    claytoServices.factory(
        'Photoset',
        function ($resource) {
            return $resource(flickr_clayto_photoset, {}, {});
        }
    );

}());
