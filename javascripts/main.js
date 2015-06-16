angular.module('myApp', ['angular-confirm'])
  .controller('MyController', function($scope, $confirm) {

    $scope['delete'] = function() {
      $scope.deleted = 'Deleted';
    };
    
    $scope['deleteConfirm'] = function() {
      $confirm({text: 'Are you sure you want to delete?'})
        .then(function() {
          $scope.deletedConfirm = 'Deleted';
        });
    };
    
    $scope['deleteConfirmWithSettings'] = function(settings) {
      $confirm(angular.extend({text: 'Are you sure you want to delete?'}, settings || {}))
        .then(function() {
          $scope.deletedConfirm = 'Deleted';
        });
    };
    
  });
