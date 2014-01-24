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

    clayto.directive('slidePhoto', ['$animate', function ($animate) {
        return function ($scope, element, attrs) {

            //$animate.addClass(element, 'slide-right', function callback () {
                //setTimeout(function() {
                    //$animate.removeClass(element, 'slide-right');
                //}.bind(this), 1000);
            //});
            //the attrs object is where the ngAnimate attribute is defined

            //injects the element into the DOM then animates
            //animate.enter(element, parent);

            //animates then removes the element from the DOM
            //animate.leave(element);

            //moves it around in the DOM then animates
            //animate.move(element, parent, sibling);

            //sets CSS display=block then animates
            //animate.show(element);

            //animates then sets CSS display=none
            //animate.hide(element);

            //animates a custom animation referenced in the ngAnimate attr
            //by the event name (so ngAnimate="{custom:'animation'}")
            //animate.animate('custom', element);

        };
    }]);

}());
