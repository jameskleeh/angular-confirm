angular.module('confirm', ['ui.bootstrap'])
.controller('ConfirmModalController', function($scope, $modalInstance, data) {
  $scope.data = angular.copy(data);

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
.value('$confirmSettings', {
  template: '<div class="modal-header"><h3 class="modal-title">Confirm</h3></div><div class="modal-body">{{data.text}}</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>',
  controller: 'ConfirmModalController',
  resolve: {
    data: function() {
      return data;
    }
  }
})
.factory('$confirm', function($modal, $confirmSettings) {
  return function(data, func) {
    
    if ('templateUrl' in $confirmSettings) {
      delete $confirmSettings.template;
    }

    var modal = $modal.open($confirmSettings);

    modal.result.then(function () {			
    	func();
    });
    
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
          function bindConfirm() {
            element.unbind("click").bind("click", function() {
            	$confirm({text: scope.confirm}, scope.ngClick);
            });
          }

          if ('confirmIf' in attrs) {
            scope.$watch('confirmIf', function(newVal) {
              element.unbind("click");
              if (newVal) {
                bindConfirm();
              } else {
                element.bind("click", function() {
                  scope.ngClick();
                });
              }
            });
          } else {
            bindConfirm();
          }
        }
    }
});
