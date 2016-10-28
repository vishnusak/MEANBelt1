app.controller('newQuestionController', ['$scope', '$location', 'userService', 'qnaFactory', function($scope, $location, userService, factory){
  if (!userService.getUser()){
    $location.url('/')
  } else {
    $scope.userName   = userService.getUser()
  }
  var serverRoute = '/question'

  $scope.new = {}

  $scope.goHome = function(){
    $location.url('/index')
  }

  $scope.logout = function(){
    userService.logoutUser()
    $location.url('/')
  }

  $scope.submit = function(){
    if (!$scope.new['question']){
      $scope.newQError = "The question cannot be empty"
    } else if ($scope.new['question'].length < 10){
      $scope.newError = "Too short to be considered a question. Must be atleast 10 characters long"
    } else {
      $scope.newQError = ''
      factory.add(serverRoute, $scope.new)
      .then(function(serverData){
        if ('error' in serverData.data){
          $scope.newQError = serverData.data['error']
        } else if ('dbErr' in serverData.data){
          $scope.newQError = serverData.data['dbErr']
        } else {
          $location.url('/index')
        }
      })
    }
  }

}])
