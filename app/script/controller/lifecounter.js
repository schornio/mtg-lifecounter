'use strict';

function LifecounterController($scope) {
  let socket = io.connect('http://localhost:8080');

  $scope.you = 20;
  $scope.opponent = 20;

  $scope.player = 'you';

  $scope.network = 'connecting';

  $scope.add = function (x) {
    switch ($scope.player) {
      case 'you':
        $scope.you += x;
        socket.emit('lifecounter', { player: 'you', count: $scope.you });
        break;
      case 'opponent':
        $scope.opponent += x;
        socket.emit('lifecounter', { player: 'opponent', count: $scope.opponent });
        break;
    }
  };

  $scope.sub = function (x) {
    switch ($scope.player) {
      case 'you':
        $scope.you -= x;
        socket.emit('lifecounter', { player: 'you', count: $scope.you });
        break;
      case 'opponent':
        $scope.opponent -= x;
        socket.emit('lifecounter', { player: 'opponent', count: $scope.opponent });
        break;
    }
  };

  $scope.next = function () {
    switch ($scope.player) {
      case 'you':
        $scope.player = 'opponent';
        break;
      case 'opponent':
        $scope.player = 'you';
        break;
    }
  };

  socket.on('player', function () {
    $scope.$apply(function () {
      $scope.network = 'connected';
    });
  });

  socket.on('lifecounter', function (data) {
    $scope.$apply(function () {
      switch (data.player) {
        case 'you':
          $scope.you = data.count;
          break;
        case 'opponent':
          $scope.opponent = data.count;
          break;
      }
    });
  });
}

lifecounterApp.controller.LifecounterController = LifecounterController;
