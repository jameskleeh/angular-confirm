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
.service('$confirmModalSettings', function() {
  this.template = '<div class="modal-header"><h3 class="modal-title">Confirm</h3></div><div class="modal-body">{{data.text}}</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';
  this.controller = 'ConfirmModalController';
})
.factory('$confirm', function($modal, $confirmModalSettings) {
  return function(data, func, settings) {
    settings = settings || $confirmModalSettings;
    
    if ('templateUrl' in settings && 'template' in settings) {
      delete settings.template;
    }
    
    settings.resolve = {data: function() { return data; }};

    var modal = $modal.open(settings);

    modal.result.then(func);
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
            console.log('confirmIf is in attrs');
            scope.$watch('confirmIf', function(newVal) {
              console.log('inside watch - unbound click');

              element.unbind("click");
              if (newVal) {
                console.log('inside watch - calling bindConfirm');
                bindConfirm();
              } else {
                console.log('inside watch - creating regular click handler');
                console.log(scope.ngClick);
                element.bind("click", function() {
                  scope.ngClick();
                  console.log(scope);
                });
              }
            });
          } else {
            bindConfirm();
          }
        }
    }
});
