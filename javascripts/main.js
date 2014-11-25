angular.module('myApp', ['angular-confirm'])
  .controller('MyController', function($scope, $timeout) {
    
    function hide(func) {
      return $timeout(func, 3000);
    }
    
    var hideTimeout;

    $scope.delete = function() {
      $scope.deleted = 'Deleted';
      $timeout.cancel(hideTimeout);
      hideTimeout = hide(function() {
        $scope.deleted = '';
      })
    };
    

    
  });
