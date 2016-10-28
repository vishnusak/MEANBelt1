app.controller('dashController', ['$scope', '$location', 'userService', 'qnaFactory', function($scope, $location, userService, factory){
  if (!userService.getUser()){
    console.log(userService.getUser())
    console.log("here");
    $location.url('/')
  } else {
    $scope.userName   = userService.getUser()
  }
  var serverRoute = '/question'

  factory.getRows(serverRoute)
  .then(function(questions){
    $scope.questions = questions.data
    for (let i = 0; i < $scope.questions.length; i++){
      $scope.questions[i]['answerCount'] = $scope.questions[i]['answers'].length
    }
  })

  $scope.logout = function(){
    userService.logoutUser()
    $location.url('/')
  }

  $scope.gotoNewQuestion = function(){
    $location.url('/newQuestion')
  }

  $scope.gotoQuestion = function(id){
    $location.url(`/question/${id}`)
  }

  $scope.gotoAnswer = function(id){
    $location.url(`/question/newAnswer/${id}`)
  }
}])
