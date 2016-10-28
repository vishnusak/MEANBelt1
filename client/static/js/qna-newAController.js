app.controller('newAnswerController', ['$scope', '$location', '$routeParams', 'userService', 'qnaFactory', function($scope, $location, $routeParams, userService, factory){
  if (!userService.getUser()){
    $location.url('/')
  } else {
    $scope.userName   = userService.getUser()
  }
  var serverRoute = '/answer',
      questionRoute= `/question/${$routeParams['id']}`

  $scope.new = {}

  factory.getOne(questionRoute)
  .then(function(question){
    if ('dbErr' in question.data){
      $scope.newAError = question.data['dbErr']
    } else {
      $scope.question = question.data[0]['question']
      if ('desc' in question.data[0]){
        $scope.desc   = question.data[0]['desc']
      } else {
        $scope.desc   = ''
      }
      $scope.qid      = question.data[0]['_id']
    }
  })

  $scope.goHome = function(){
    $location.url('/index')
  }

  $scope.gotoQuestion = function(id){
    $location.url(`/question/${id}`)
  }

  $scope.logout = function(){
    userService.logoutUser()
    $location.url('/')
  }

  $scope.submit = function(){
    if (!$scope.new['answer']){
      $scope.newQError = "The answer cannot be empty"
    } else if ($scope.new['answer'].length < 5){
      $scope.newError = "Too short to be considered an answer. Must be atleast 5 characters long"
    } else {
      $scope.newAError = ''
      $scope.new['qid'] = $scope.qid
      $scope.new['userName'] = $scope.userName

      factory.add(serverRoute, $scope.new)
      .then(function(serverData){
        if ('error' in serverData.data){
          $scope.newAError = serverData.data['error']
        } else if ('dbErr' in serverData.data){
          $scope.newAError = serverData.data['dbErr']
        } else {
          $location.url('/index')
        }
      })
    }
  }

}])
