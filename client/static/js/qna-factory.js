app.factory('qnaFactory', ['$http', function($http){
  var factory = {}

  factory.getRows = function(serverRoute){
    return $http({
      method: 'GET',
      url: serverRoute
    })
  }

  factory.add = function(serverRoute, data){
    return $http({
      method: 'POST',
      url: serverRoute,
      data: data
    })
  }

  factory.getOne = function(serverRoute){
    return $http({
      method: 'GET',
      url: serverRoute
    })
  }

  factory.update = function(serverRoute){
    return $http({
      method: 'PUT',
      url: serverRoute
    })
  }

  return factory
}])
