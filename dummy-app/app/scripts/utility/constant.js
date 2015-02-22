/*
 * Contants
 */
'use strict';
var constantsModule = angular.module('myApp.constants', []);

constantsModule.constant('liaisonConstants', {
    appName: 'Liaison My Psych Track',
    loginErrorUsernamePassword: 'You must enter username and password to log in',
    loginErrorInvalidCredentials: 'Invalid credentials,Try Again!'
});