/*
 * angular-confirm
 * confirm notes extension by Marco Acchini https://github.com/akka81
 * https://github.com/Schlogen/angular-confirm
 * @version v1.3 - 2016-01-23
 * @license Apache
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    // CommonJS support (for us webpack/browserify/ComponentJS folks)
    module.exports = factory(require('angular'));
  } else {
    // in the case of no module loading system
    // then don't worry about creating a global
    // variable like you would in normal UMD.
    // It's not really helpful... Just call your factory
    return factory(root.angular);
  }
}(this, function (angular) {
angular.module('angular-confirm', ['ui.bootstrap.modal'])
  .controller('ConfirmModalController',['$scope','$uibModalInstance','data','directivescope' ,function ($scope, $uibModalInstance, data, directivescope) {
    $scope.data = angular.copy(data);
     $scope.directivescope = directivescope;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }])
  .value('$confirmModalDefaults', {
    template:'<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
    '<div class="modal-body">{{data.text}}<br/>'+
    '<textarea  class="form-control" rows="10" style=\'width:100%\' ng-if=\"data.isEnabled\" ng-model=\"directivescope.confirmMessage\"></textarea> </div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-success" ng-click="ok()">{{data.ok}}</button>' +
    '<button class="btn btn-danger" ng-click="cancel()">{{data.cancel}}</button>' +
    '</div>',
    controller: 'ConfirmModalController',
    defaultLabels: {
      title: 'Confirm',
      ok: 'OK',
      cancel: 'Cancel',
      isEnabled:'false'
    }
  })
  .factory('$confirm',['$uibModal','$confirmModalDefaults', function ($uibModal, $confirmModalDefaults) {
    return function (data, settings,scope) {
      var defaults = angular.copy($confirmModalDefaults);
      settings = angular.extend(defaults, (settings || {}));
      
      data = angular.extend({}, settings.defaultLabels, data || {});

      if ('templateUrl' in settings && 'template' in settings) {
        delete settings.template;
      }

      settings.resolve = {
        data: function () {
          return data;
        },
         directivescope: function () { return scope;}
      };

      return $uibModal.open(settings).result;
    };
  }])
  .directive('confirm', ['$confirm',function ($confirm) {
    return {
      priority: 1,
      restrict: 'A',
      scope: {
        confirmIf: "=",
        ngClick: '&',
        confirm: '@',
        confirmSettings: "=",
        confirmTitle: '@',
        confirmOk: '@',
        confirmCancel: '@',
        confirmMessage:'='
      },
      link: function (scope, element, attrs) {

        element.unbind("click").bind("click", function ($event) {

          $event.preventDefault();

          if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {

            var data = {text: scope.confirm};
            if (scope.confirmTitle) {
              data.title = scope.confirmTitle;
            }
            if (scope.confirmOk) {
              data.ok = scope.confirmOk;
            }
            if (scope.confirmCancel) {
              data.cancel = scope.confirmCancel;
            }
             if (scope.confirmMessage!=null)
                data.isEnabled = true;
            else
                data.isEnabled = false;
            $confirm(data, scope.confirmSettings || {},scope).then(scope.ngClick);
          } else {

            scope.$apply(scope.ngClick);
          }
        });

      }
    }
  }]);
}));