var app = angular.module('myApp', ['ngRoute'])

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/login.html',
    controller: 'loginController'
  })
  .when('/index', {
    templateUrl: '/dashboard.html',
    controller: 'dashController'
  })
  .when('/newQuestion', {
    templateUrl: '/newQuestion.html',
    controller: 'newQuestionController'
  })
  .when('/question/newAnswer/:id', {
    templateUrl: '/newAnswer.html',
    controller: 'newAnswerController'
  })
  .when('/question/:id', {
    templateUrl: '/showQuestion.html',
    controller: 'showQController'
  })
  .otherwise({
    redirectTo: '/'
  })
})

app.service('userService', function(){
  var userName = ''

  return {
    getUser: function(){
      return userName
    },

    setUser: function(value){
      userName = value
    },

    logoutUser: function(){
      userName = ''
    }
  }
})
