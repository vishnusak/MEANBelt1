app.controller('loginController', ['$scope', '$location', 'userService', function($scope, $location, userService){
  if (userService.getUser()){
    $location.url('/index')
  }
  $scope.userName   = ''
  $scope.loginError = ''

  $scope.loginUser = function(){
    if ($scope.userName){
      $scope.loginError = ''
      userService.setUser($scope.userName)
      $location.url('/index')
    } else {
      $scope.loginError = "Please enter a name to login"
    }
  }
}])
