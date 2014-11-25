angular.module('myApp', ['angular-confirm'])
  .controller('MyController', function($scope) {

    $scope['delete'] = function() {
      console.log('inside scope delete');
      $scope.deleted = 'Deleted';
    };
    
  });
