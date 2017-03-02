(function() {
  'use strict';

  angular
    .module('mules-md-dialog-helper', [
      'ngMaterial'
    ]);
})();

(function() {
  'use strict';

  angular
    .module('mules-md-dialog-helper')
    .controller('DialogController', DialogController);

  DialogController.$inject = ['$mdDialog'];

  /* @ngInject */
  function DialogController($mdDialog) {
    var vm = this;
    vm.hide = hide;
    vm.cancel = cancel;
    vm.answer = answer;

    activate();

    function activate() {

    }

    function hide() {
      $mdDialog.hide();
    }

    function cancel() {
      $mdDialog.cancel();
    }

    function answer(answer) {
      $mdDialog.hide(answer);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('mules-md-dialog-helper')
    .factory('dialogFactory', dialogFactory);

  dialogFactory.$inject = ['$mdDialog', '$mdMedia'];

  /* @ngInject */
  function dialogFactory($mdDialog, $mdMedia) {
    var defaults = {
      title: 'Warning',
      content: 'Are You Sure?',
      ariaLabel: 'Warning',
      okLabel: 'Ok',
      cancelLabel: 'Cancel'
    };
    var advancedDefaults = {
      controller: 'DialogController',
      templateUrl: '../../views/dialog.html',
      clickOutsideToClose: true,
    };
    var customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    var service = {
      showAlert: showAlert,
      showConfirm: showConfirm,
      showAdvanced: showAdvanced,
      warnConfirm: warnConfirm
    };

    return service;

    ////////////

    function build(dialog, ev, title, content, okLabel, ariaLabel, cancelLabel) {
      title = title || defaults.title;
      content = content || defaults.content;
      ariaLabel = ariaLabel || defaults.ariaLabel;
      okLabel = okLabel || defaults.okLabel;
      cancelLabel = cancelLabel || defaults.cancelLabel;

      var modalDialog = dialog
        .title(title)
        .textContent(content)
        .ariaLabel(ariaLabel)
        .ok(okLabel)
        .cancel(cancelLabel);

      if (ev) {
        modalDialog.targetEvent(ev)
      }

      return modalDialog;
    }

    function buildAdvanced(ev, controller, templateUrl, clickOutsideToClose) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
      controller = controller || advancedDefaults.title;
      templateUrl = templateUrl || advancedDefaults.templateUrl;
      clickOutsideToClose = clickOutsideToClose || advancedDefaults.clickOutsideToClose;

      return {
        controller: controller,
        controllerAs: 'vm',
        templateUrl: templateUrl,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: clickOutsideToClose,
        fullscreen: useFullScreen
      };
    }

    /**
     * Display an alert dialog.
     * Appending dialog to document.body to cover sidenav in docs app
     * Modal dialogs should fully cover application
     * to prevent interaction outside of dialog.
     * @param  {Event} ev - The event object.
     * @param  {string} title - The title of the dialog.
     * @param  {string} content - The text of the dialog.
     * @param  {string} okLabel - Label for 'OK' button.
     * @param  {string} ariaLabel [description]
     * @return {void}
     */
    function showAlert(ev, title, content, okLabel, ariaLabel) {
      var p = angular.element(document.querySelector('#popupContainer'));
      var alert = $mdDialog.alert()
        .parent(p)
        .clickOutsideToClose(true);

      return $mdDialog.show(
        build(
          alert,
          ev,
          title,
          content,
          okLabel,
          ariaLabel
        )
      );
    }

    function showConfirm(ev, title, content, okLabel, cancelLabel, ariaLabel) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .cancel(cancelLabel);

      return $mdDialog.show(
        build(
          confirm,
          ev,
          title,
          content,
          okLabel,
          ariaLabel
        )
      ).then(function() {
        return true;
      }, function() {
        return false;
      });
    }

    function showAdvanced(ev, controller, templateUrl, clickOutsideToClose) {
      $mdDialog.show(buildAdvanced(
        ev,
        controller,
        templateUrl,
        clickOutsideToClose
      )).then(function(answer) {
        return answer;
      }, function() {
        return false;
      });
    }

    function warnConfirm(content) {
      var ev, title, okLabel, cancelLabel, ariaLabel;
      return showConfirm(ev, title, content, okLabel, cancelLabel, ariaLabel);
    }

  }
})();
