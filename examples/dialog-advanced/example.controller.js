(function() {
  'use strict';

  angular
    .module('example')
    .controller('ExampleController', ExampleController);

  ExampleController.$inject = ['dialogFactory'];

  function ExampleController(dialogFactory) {
    var vm = this;
    vm.showAdvanced = showAdvanced;
    vm.warnConfirm = warnConfirm;

    activate();

    ////////////////

    function activate() {}

    function showAdvanced(event) {
      dialogFactory.showAdvanced(event, 'ExampleDialogController', '../../views/dialog.html', true);
    }

    function warnConfirm() {
      dialogFactory.warnConfirm('Are you sure about this?');
    }
  }
})();
