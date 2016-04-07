/*
 * angular-confirm
 * https://github.com/Schlogen/angular-confirm
 * @version v1.2.3 - 2016-01-26
 * @license Apache
 *
 * Refactored by Codermar. Corrected issues with minification and strict DI
 */

(function (angular) {
  'use strict';

  angular
      .module('angular-confirm', ['ui.bootstrap.modal'])
      .controller('ConfirmModalController', ConfirmModalController)
      .value('$confirmModalDefaults', getValueConfig())
      .directive('confirm', ConfirmDirective)
      .factory('$confirm', ConfigFactory);


  ConfirmModalController.$inject = ['$scope', '$uibModalInstance', 'data'];
  /* @ngInject */
  function ConfirmModalController($scope, $uibModalInstance, data) {
    $scope.data = angular.copy(data);

    $scope.ok = function (closeMessage) {
      $uibModalInstance.close(closeMessage);
    };

    $scope.cancel = function (dismissMessage) {
      if (angular.isUndefined(dismissMessage)) {
        dismissMessage = 'cancel';
      }
      $uibModalInstance.dismiss(dismissMessage);
    };
  }

  function getValueConfig() {

    var config = {
      template: '<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
      '<div class="modal-body">{{data.text}}</div>' +
      '<div class="modal-footer">' +
      '<button class="btn btn-primary" ng-click="ok()">{{data.ok}}</button>' +
      '<button class="btn btn-default" ng-click="cancel()">{{data.cancel}}</button>' +
      '</div>',
      controller: 'ConfirmModalController',
      defaultLabels: {
        title: 'Confirm',
        ok: 'OK',
        cancel: 'Cancel'
      }
    };

    return config;
  }

  ConfigFactory.$inject = ['$uibModal', '$confirmModalDefaults'];
  /* @ngInject */
  function ConfigFactory($uibModal, $confirmModalDefaults) {
    return function (data, settings) {
      var defaults = angular.copy($confirmModalDefaults);
      settings = angular.extend(defaults, (settings || {}));

      data = angular.extend({}, settings.defaultLabels, data || {});

      if ('templateUrl' in settings && 'template' in settings) {
        delete settings.template;
      }

      settings.resolve = {
        data: function () {
          return data;
        }
      };

      return $uibModal.open(settings).result;
    };
  }

  ConfirmDirective.$inject = ['$confirm'];
  /* @ngInject */
  function ConfirmDirective($confirm) {
    var directive = {
      priority: 1,
      restrict: 'A',
      scope: {
        confirmIf: '=',
        ngClick: '&',
        confirm: '@',
        confirmSettings: '=',
        confirmTitle: '@',
        confirmOk: '@',
        confirmCancel: '@'
      },
      link: linkFn
    };
    return directive;

    function linkFn(scope, element, attrs) {
      element.unbind('click').bind('click', function ($event) {

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
          $confirm(data, scope.confirmSettings || {}).then(scope.ngClick);
        } else {

          scope.$apply(scope.ngClick);
        }
      });
    }

  }

}(window.angular));
