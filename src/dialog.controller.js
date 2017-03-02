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
