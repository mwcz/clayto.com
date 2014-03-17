/*globals clayto, console*/
/*jshint browser: true*/

(function () {
    'use strict';

    /* Animations */

    clayto.animation('.photo-slide', function () {
        var next = 1;
        var prev = -1;
        return {
            beforeAddClass: function (element, className, done) {
                var lee;
                var scope = angular.element(element).scope();

                // if this was a swipe action, a finger swipe for example, add
                // an animation in the same direction the finger swiped...
                // swipt.. swupt?
                if (scope.type === 'swipe') {
                    lee = scope.current_photo - scope.$index; // lee = the direction in which something faces
                    if (lee === next) {
                        element.addClass('slide-left');
                    } else if (lee === prev) {
                        element.addClass('slide-right');
                    }
                }
                done();
            },
            beforeRemoveClass: function (element, className, done) {
                element.removeClass('slide-left');
                element.removeClass('slide-right');
                done();
            }
        };
    });
}());

