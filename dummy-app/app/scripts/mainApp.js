'use strict';
var myApp = angular.module('myApp', ['ngRoute', // Route service
    'myApp.utilityService', 'myApp.constants', // MISC
    'myApp.directives', 'myApp.filters', // MISC
    'myApp.services', // Services
    'myApp.controller', // controller
    'metatags'
]);

myApp.config(['$routeProvider','MetaTagsProvider', function($routeProvider, MetaTagsProvider) {

        console.log(MetaTagsProvider);
        // Login
        $routeProvider.when('/page1/:something/:somethingelse', {
            templateUrl: 'partials/page1.html',
            controller: 'sampleCtrl'
        }).when('/page2', {
            templateUrl: 'partials/page1.html',
            controller: 'sampleCtrl'
        }).when('/page3', {
            templateUrl: 'partials/page1.html',
            controller: 'sampleCtrl'
        });
        
        // Default
        $routeProvider.otherwise({
            redirectTo: '/page1'
        });

        MetaTagsProvider
          .when('/', {
            title: 'Great',
            description: 'Cool'
          })
          .when('/page1/:something/:somethingelse',{
            title: 'Page 1 :something',
            description: function(arg1, arg2){
                console.log('arg1', arg1);
                console.log('arg2', arg2);
                return 'COOOOOOOL';
            }
          })
          .when('/page2',{
            title: 'Page 2',
            description: 'Another great page'
          })
          .when(/^foo(bar)?$/i, {
            title: 'Regex',
            description: 'Anothere regex'
          })
          .otherwise({
            title: 'otherwise',
            description: 'Another greate place'
          })
    }]);

myApp.run(function(MetaTags){
    MetaTags.initialize();
});