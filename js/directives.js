/*globals clayto, console, $*/
/*jshint browser: true*/

(function () {
    'use strict';

    clayto.directive('keyLeft', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 37) {
                    scope.$apply(function (){
                        scope.$eval(attrs.keyLeft);
                    });
                    event.preventDefault();
                }
            });
        };
    });

    clayto.directive('keyRight', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 39) {
                    scope.$apply(function (){
                        scope.$eval(attrs.keyRight);
                    });
                    event.preventDefault();
                }
            });
        };
    });

}());
