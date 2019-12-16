(function(){

  var isJsonObject = function(params){
    return (   params !== null 
            && params !== undefined 
            && params instanceof Object 
            && Object.keys(params).length > 0
           );
  };

  var isArrayObject = function(params){
    return (   params !== null
            && params !== undefined
            && params instanceof Array
            && params.length > 0
           );
  };

  var formatStringByArray = function(rootObj, params){
    // "alfa {0}"
    var keys = rootObj.match(/(\{[\d]{1,}\}){1}/g);
    for(var key in keys){
      // replace from {0} the "{" and "}" to empty string
      var keyValue = key.replace('{', '').replace('}', '');
      rootObj = rootObj.replace(
          '{'+key+'}', 
          params[keyValue]
      );
    }

    return rootObj;
  };

  var formatStringByJson = function(rootObj, params){
    // "alfa {0}"
    var keys = rootObj.match(/(\{[a-zA-Z0-9]{1,}\}){1}/g);
    for(var key in keys){
      // replace from {0} the "{" and "}" to empty string
      var keyValue = keys[key].replace('{', '').replace('}', '');
      rootObj = rootObj.replace(
          keys[key], 
          params[keyValue]
      );
    }

    return rootObj;
  };

  var format = function(source, params){ 

    if (params === null || params === undefined){
      return source;
    } else if (isJsonObject(params)){
      return formatStringByJson(source, params);
    } else if (isArrayObject(params)){
      return formatStringByArray(source, params);
    } else {
      throw 'Invalid params object';
    }
  };

  String.prototype.format = function(params){
    var $rootObj = this; 
    return format($rootObj, params);
  };

  if (typeof(angular) !== 'undefined') {
    angular.module('angular-format', []).filter('format', function() {
      return function(sourceStr, params) {
        return format(sourceStr, params);
      };
    });
  }

  return {};
})();