/**
 * Author Avraam Mavridis (avr.mav@gmail.com)
 * https://github.com/AvraamMavridis
 */
angular.module('metatags', [])
  .provider('MetaTags',function(){

    var routes = {};
    var otherwise = {};

    this.when = function(path, metatags){
      routes[path] = metatags;
      return this;
    };

    this.otherwise = function(metatags){
      otherwise = metatags;
      return this;
    };

    var getMetaTags = function(path){
      var info = {};
      var routesArray = Object.keys(routes);
      var routesLength = routesArray.length;
      var placeholder = {};

      for(var i = 0; i < routesLength; i++){

        var routeName = routesArray[i];
        var routeMetaTagsObject = routes[routeName];
        var routeMetaTagsArray = Object.keys(routeMetaTagsObject);
        var routeArgs = routeName.split('/').filter(Boolean);
        var routeArgsLength = routeArgs.length;
        var pathArgs = path.split('/').filter(Boolean);
        var pathArgsLength = pathArgs.length;
        var flag1 = true;
        var flag2 = false;

        if(routeArgsLength !== pathArgsLength){
          continue;
        }

        for(var j = 0; j < pathArgsLength; j++){
          if(routeArgs[j].indexOf(':') === 0){
            placeholder[pathArgs[j]] = routeArgs[j];
            continue;
          }
          if (pathArgs[j] !== routeArgs[j]){
            placeholder = {};
            flag1 = false;
            break;
          }
        }

        var routeMetaTagsLength = routeMetaTagsArray.length;
        var placeHolderLength = Object.keys(placeholder).length;



        if(placeHolderLength > 0){
          for(var ii = 0; ii < routeMetaTagsLength; ii++){
            var tag = routeMetaTagsArray[ii];
            if(typeof(routeMetaTagsObject[tag]) === 'string')
              info[tag] = routeMetaTagsObject[tag];
            if(typeof(routeMetaTagsObject[tag]) === 'function'){
               var functionResponse = routeMetaTagsObject[tag].apply(this, Object.keys(placeholder));
              if(typeof(functionResponse) !== 'string')
                throw new Error(routeMetaTagsObject[tag].toString() + ' should return a string');
              else
                info[tag] = functionResponse;
            }
          }

          for(var p in placeholder){
            for(var t in info){
              info[t] = info[t].replace(placeholder[p], p);
            }
          }
            return info;
        }
        else{
            for (var o in otherwise) {
                info[o] = otherwise[o];
            }

            if (routeArgs[routeArgsLength - 1] === pathArgs[routeArgsLength - 1]) {
                flag2 = true;
                break;
            }
        }
      }
        if (flag1 && flag2) {
            for (var o in routeMetaTagsObject) {
                info[o] = routeMetaTagsObject[o];
            }
            return info;
        } else {
            return info;
        }
    };


    this.$get = ["$rootScope", "$location", function ($rootScope, $location){

        var update = function(){
          path = $location.path();
          info = getMetaTags(path);
          for(var tt in info){
            $rootScope.metatags[tt] = info[tt];
          }
        };

        return {
          initialize: function(){
            $rootScope.metatags = {};
                try {
                  angular.module('ngRoute');
                  $rootScope.$on('$routeChangeSuccess', update);
                } catch(err) {
                  $rootScope.$on('$stateChangeSuccess', update);
                }
          }
        }
    }];
  });

