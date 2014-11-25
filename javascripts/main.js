angular.module('myApp', ['angular-confirm'])
  .controller('MyController', function($scope, $timeout) {
    
    function hide(func) {
      $timeout(function() {
        func();
      }, 3000);
    }
    
    $scope.delete = function() {
      $scope.deleted = 'Deleted';
      hide(function() {
        $scope.deleted = '';
      })
    };
    
    $scope.deleteTwo = function() {
      $scope.deleted_two = 'Deleted';
      hide(function() {
        $scope.deleted_two = '';
      })
    }; 
    
  });
