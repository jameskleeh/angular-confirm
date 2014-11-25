angular.module('myApp', ['angular-confirm'])
  .controller('MyController', function($scope) {

    $scope.delete = function() {
      $scope.deleted = 'Deleted';
    };
    
  });
