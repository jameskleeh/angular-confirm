angular.module('myApp', ['angular-confirm'])
  .controller('MyController', function($scope, $timeout) {
    
    function hide(func) {
      return $timeout(func, 3000);
    }
    
    var hideTimeout;
    var hideTimeout_two;
    
    $scope.delete = function() {
      $scope.deleted = 'Deleted';
      $timeout.cancel(hideTimeout);
      hideTimeout = hide(function() {
        $scope.deleted = '';
      })
    };
    
    $scope.deleteTwo = function() {
      $scope.deleted_two = 'Deleted';
      $timeout.cancel(hideTimeout_two);
      hideTimeout_two = hide(function() {
        $scope.deleted_two = '';
      })
    }; 
    
  });
