app.controller('showQController', ['$scope', '$location', '$routeParams', 'userService', 'qnaFactory', function($scope, $location, $routeParams, userService, factory){
  if (!userService.getUser()){
    $location.url('/')
  } else {
    $scope.userName   = userService.getUser()
  }
  var serverRoute = `/question/${$routeParams['id']}`,
      answerRoute = '/answer'

  function getQnA(){
    factory.getOne(serverRoute)
    .then(function(question){
      if ('dbErr' in question.data){
        $scope.error = question.data['dbErr']
      } else {
        $scope.question = question.data[0]['question']
        if ('desc' in question.data[0]){
          $scope.desc   = question.data[0]['desc']
        } else {
          $scope.desc   = ''
        }
        $scope.qid      = question.data[0]['_id']
        $scope.answers  = question.data[0]['answers']
      }
    })
  }

  getQnA()

  $scope.goHome = function(){
    $location.url('/index')
  }

  $scope.answerQuestion = function(id){
    $location.url(`/question/newAnswer/${id}`)
  }

  $scope.logout = function(){
    userService.logoutUser()
    $location.url('/')
  }

  $scope.addLike = function(id){
    let route = `${answerRoute}/${id}`
    factory.update(route)
    .then(function(serverData){
      if ('dbErr' in serverData.data){
        $scope.error = serverData.data['dbErr']
      } else {
        getQnA()
      }
    })
  }
}])
