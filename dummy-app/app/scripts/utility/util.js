/*
 * Utility
 */
'use strict';
var utilityModule = angular.module('myApp.utilityService', []);

utilityModule.service('utilService', ['$timeout', function(timeout) {

        this.showLoader = function() {
            timeout(function() {
                // sample task to be done after 2000 milli sec
            }, 2000);
        };

        this.dismissProgress = function() {
            timeout(function() {
                // sample task to be done after 2000 milli sec
            }, 2000);
        };

    }]);