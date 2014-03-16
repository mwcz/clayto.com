/*globals clayto*/
/*jshint browser: true*/

(function () {
    'use strict';

    var KEY_CODE_TO_NAME = {
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down'
    };

    var KEY_NAME_TO_CODE = {
        'left'  : 37,
        'up'    : 38,
        'right' : 39,
        'down'  : 40
    };

    function key(code_or_name) {
        var retval;
        if (typeof code_or_name === 'string') {
            retval = KEY_NAME_TO_CODE[ code_or_name.toLowerCase() ];
        } else if (typeof code_or_name === 'number') {
            retval = KEY_CODE_TO_NAME[code_or_name];
        }
        return retval;
    }

    function handle_keypress (keycode_or_name) {
        var keycode = key(keycode_or_name);
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === keycode) {
                    scope.$apply(function (){
                        var direction_name = key(keycode);
                        scope.$eval(attrs['key' + direction_name]);
                    });
                    event.preventDefault();
                }
            });
        };
    }

    clayto.directive('keyUp', function () {
        return handle_keypress('up');
    });

    clayto.directive('keyDown', function () {
        return handle_keypress('down');
    });

    clayto.directive('keyLeft', function () {
        return handle_keypress('left');
    });

    clayto.directive('keyRight', function () {
        return handle_keypress('right');
    });

}());
