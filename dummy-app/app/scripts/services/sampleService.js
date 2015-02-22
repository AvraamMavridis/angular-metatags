/*
 * Services
 */
'use strict';
var serviceModule = angular.module('myApp.services', []);

serviceModule.factory('sampleFactory', ['$http', function(http) {
        return {
            testFunction: function() {
                return http.get('http://www.td.com/api/getContacts');
            },
            testFunction2: function() {
                return 'test2';
            }
        };
    }]);
