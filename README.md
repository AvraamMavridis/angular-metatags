# **Angular MetaTags module**

Module to dynamically provide metatags based on the path. After this [PR](https://github.com/AvraamMavridis/angular-metatags/pull/5) it supports both ngRoute and ui-router (only simple states).

## **How to use it**

#### Include `angular-metatags.js` or `angular-metatags.min.js` to your html file before your app script and after the angular's core script

```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-route/angular-route.js"></script>
<script src="scripts/angular-metatags.js"></script>
<script src="scripts/mainApp.js"></script>
```

#### Include the module in your app

```js
var myApp = angular.module('myApp', ['ngRoute','metatags']);
```

#### Inject the MetaTagsProvider in the config and define your meta tags
```js
myApp.config(['$routeProvider','MetaTagsProvider', function($routeProvider, MetaTagsProvider) {

        ...
        ...
        
        MetaTagsProvider
          .when('/', {
            title: 'Great',
            description: 'Cool'
            fb_title: 'My title'
            fb_site_name: 'My site name' 
            fb_url: 'www.blablabla.blabla' 
            fb_description: 'Cool website'
            fb_type: 'Facebook type'
            fb_image: 'an_image.jpg' 
          })
          .when('/page1/:parameter1/:parameter2',{
            title: 'Page 1 :something',
            description: function(parameter1, parameter2){
                return 'COOOOOOOL' + parameter1 + " Super " + parameter2;
            }
            robots: 'index, follow'
            keywords: 'some cool keywords'
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
```

`when` Accepts a string with the path and an object with metatags `when(path,metatags)` The path can contain parameters, each parameter should start with `:` . Each attribute of the metatags object can be a string or a function that returns a string. The string can contain a parameter that will be replaced. If the path contain parameters and an attribute of the metatags object is a function the parameters are passed to that function. 
###### Example
If we define a route like this
```js
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
```
and we visit the path `/page1/geography/nationalgeographic` We will have the following object of metatags:

```js
$rootScope.metatags =  { 
  title: "Books of geography by nationalgeographic", 
  description: "We have great books of GEOGRAPHY by the amazing nationalgeographic", 
  robots: "index, follow", 
  keywords: "history art music geography" 
}
```
#### Initialize the provider on your application run
```js
myApp.run(function(MetaTags){
    MetaTags.initialize();
});
```
#### Include the metatags in your html

You can use the metatags in our html like this:
```html
  <title>{{ metatags.title }}</title>
  <meta name="description" content="{{ metatags.description }}" >
  <meta name="robots" content="{{ metatags.robots }}" >
  <meta name="keywords" content="{{ metatags.keywords }}" >
  <!-- Facebook related metatags -->
  <meta property="fb:app_id"          content="{{ metatags.fb_app_id }}" > 
  <meta property="og:url"             content="{{ metatags.fb_url }}"  > 
  <meta property="og:title"           content="{{ metatags.fb_title }}" > 
  <meta property="og:image"           content="{{ metatags.fb_image }}"  > 
  <meta property="og:description"     content="{{ metatags.fb_description }}"  >
  <meta property="og:site_name"       content="{{ metatags.fb_site_name }}" >
  <meta property="og:type"            content="{{ metatags.fb_type }}" >
```

## Angular and SEO

Until the search engine bots will be able to execute javascript properly you will have to use a tool like [prerender.io](https://prerender.io/) or [brombone](http://www.brombone.com/) to serve prerendered pages when a bot visit your site. 
You can read more for the topic on the following articles:

-[Weluse.de - Angular & SEO finally a piece of cake](https://weluse.de/blog/angularjs-seo-finally-a-piece-of-cake.html)

-[Builtvisible.com - The Basics of JavaScript Framework SEO in AngularJS](http://builtvisible.com/javascript-framework-seo/)

-[Yearofmoo.com - AngularJS and SEO](http://www.yearofmoo.com/2012/11/angularjs-and-seo.html)



