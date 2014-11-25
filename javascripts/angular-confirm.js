/*
 * angular-confirm
 * http://schlogen.github.io/angular-confirm/
 * Version: 1.0 - 2014-24-11
 * License: Apache
 */
angular.module('angular-confirm', ['ui.bootstrap'])
.controller('ConfirmModalController', function($scope, $modalInstance, data) {
  $scope.data = angular.copy(data);

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
.value('$confirmModalDefaults', {
  template: '<div class="modal-header"><h3 class="modal-title">Confirm</h3></div><div class="modal-body">{{data.text}}</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>',
  controller: 'ConfirmModalController'
})
.factory('$confirm', function($modal, $confirmModalDefaults) {
  return function(data, settings) {
    settings = angular.extend($confirmModalDefaults, (settings || {}));
    data = data || {};
        
    if ('templateUrl' in settings && 'template' in settings) {
      delete settings.template;
    }
    
    settings.resolve = {data: function() { return data; }};

    return $modal.open(settings).result;
  };
})
.directive('confirm', function($confirm) {
    return {
      priority: 1,
      restrict: 'A',
      scope: {
        confirmIf: "=",
        ngClick: '&',
        confirm: '@'
      },
      link: function(scope, element, attrs) {
        function reBind(func) {
          element.unbind("click").bind("click", function() {
            func();
          });
        }
        
        function bindConfirm() {
          $confirm({text: scope.confirm})
            .then(scope.ngClick);
        }
        
        if ('confirmIf' in attrs) {
          scope.$watch('confirmIf', function(newVal) {
            if (newVal) {
              reBind(bindConfirm);
           } else {
              reBind(function() {
             	  scope.$apply(scope.ngClick);
              }); 
            }
          });
        } else {
          reBind(bindConfirm);
        }
      }
    }
});
