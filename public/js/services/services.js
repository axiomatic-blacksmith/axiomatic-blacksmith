angular.module('axiomatic.services', [])
  .factory('qandaFactory', function($http) {
    var getAnswers = function() {
      return $http({
          method: 'GET',
          url: '/questions'
        })
        .then(function(resp) {
          return resp.data;
        });
    }
    return {
      getAnswers: getAnswers
    }
  })
  .factory('questionFormFactory', function ($http) {
    var checkUser = function (username) {
      return $http({
        method: 'GET',
        url: '/users?name=' + username
      })
      .then(function (resp) {
        return resp.data;
      });
    }

    var submitQuestion = function (question) {
      return $http({
          method: 'POST',
          url: '/questions',
          data: question
        })
        .then(function(resp) {
          return resp.data;
        });
    }
    return {
      submitQuestion: submitQuestion,
      checkUser: checkUser
    }
  })
  .factory('socketFactory', function () {
    var socket = io.connect('http://127.0.0.1:8080');
    return {
      socket: socket
    };
  });