angular.module('myApp', ['angular-confirm'])
  .controller('MyController', function($scope, $confirm) {

    $scope['delete'] = function() {
      $scope.deleted = 'Deleted';
    };
    
    $scope['deleteConfirm'] = function() {
      $confirm({
        data: {text: 'Are you sure you want to delete?'},
        confirmed: function() {
          $scope.deletedConfirm = 'Deleted';
        }
      });
    };
    
  });
