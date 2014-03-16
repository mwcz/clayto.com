/*globals clayto, console, $*/
/*jshint browser: true*/

(function () {
    'use strict';

    var KEYS = {
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down'
    };

    function handle_keypress (keycode) {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === keycode) {
                    scope.$apply(function (){
                        var direction_name = KEYS[keycode];
                        scope.$eval(attrs['key' + direction_name]);
                    });
                    event.preventDefault();
                }
            });
        };
    }

    clayto.directive('keyUp', function () {
        return handle_keypress(38);
    });

    clayto.directive('keyDown', function () {
        return handle_keypress(40);
    });

    clayto.directive('keyLeft', function () {
        return handle_keypress(39);
    });

    clayto.directive('keyRight', function () {
        return handle_keypress(37);
    });

}());
