'use strict';
var myApp = angular.module('myApp', ['ngRoute', // Route service
    'myApp.utilityService', 'myApp.constants', // MISC
    'myApp.directives', 'myApp.filters', // MISC
    'myApp.services', // Services
    'myApp.controller', // controller
    'metatags'
]);

myApp.config(['$routeProvider','MetaTagsProvider', function($routeProvider, MetaTagsProvider) {

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
          .when('/page1', {
            title: 'Great',
            description: 'Cool',
            fb_title: 'My title',
            fb_site_name: 'My site name',
            fb_url: 'www.blablabla.blabla', 
            fb_description: 'Cool website',
            fb_type: 'Facebook type',
            fb_image: 'an_image.jpg' 
          })
          .when('/page1/:parameter1/:parameter2',{
            title: 'Books of :parameter1 by :parameter2',
            description: function(parameter1, parameter2){
                return 'We have great books of ' + parameter1.toUpperCase() + ' by the amazing :parameter2';
            },
            robots: 'index, follow',
            keywords: function(parameter1){
              var keywords = ['history', 'art', 'music']
              keywords.push(parameter1);
              return keywords.join(' ');
            }
          })
          .when('/page2/:parameter1',{
            title: 'Page 2 of :parameter1',
            description: 'Another great page'
          })
          .otherwise({
            title: 'otherwise',
            description: 'Another great page'
          })
    }]);

myApp.run(function(MetaTags){
    MetaTags.initialize();
});