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
                var scope = angular.element(element).scope();
                var lee = scope.current_photo - scope.$index; // lee = the direction in which something faces
                if (lee === next) {
                    element.addClass('slide-left');
                } else if (lee === prev) {
                    element.addClass('slide-right');
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

