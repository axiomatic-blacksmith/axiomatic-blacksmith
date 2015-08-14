angular.module('StudentClassroomCtrl', [])
  .controller('StudentClassroomController', function($scope, qandaFactory, questionFormFactory, VideoFactory, socketFactory) {
    $scope.data = {};
    $scope.question = '';

    $scope.tagline = 'Welcome to the classroom!';
    $scope.getQandA = function() {
      qandaFactory.getAnswers()
        .then(function(questions) {
          $scope.data.questions = questions;
          $scope.data.answeredQuestions = questions.filter(function(question) {
            return !!question.answer;
          });
          $scope.data.questionQueue = questions.filter(function(question) {
            return !question.answer;
          });
          socketFactory.socket.on('new-question', function (question) {
            $scope.data.questionQueue.push(question);
          });
        });
    };

    $scope.askQuestion = function() {
      var data = {
        title: $scope.question,
        body: $scope.question
      };
      socketFactory.socket.emit('new-question', data)
      questionFormFactory.submitQuestion(data);
      $scope.question = '';
      VideoFactory.play();
    };

    $scope.pause = VideoFactory.pause

    $scope.getQandA();
 
    return $scope;

  });