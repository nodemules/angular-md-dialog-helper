(function() {
    'use strict';

    angular
        .module('wb-dialog-helper')
        .controller('DialogTestController', DialogTestController);

    DialogTestController.$inject = ['dialogFactory'];

    /* @ngInject */
    function DialogTestController(dialogFactory) {
        var vm = this;
        vm.showAlert = showAlert;
        vm.showConfirm = showConfirm;
        vm.showAdvanced = showAdvanced;
        vm.showTabDialog = showTabDialog;

        activate();

        function activate() {

        }

        function showAlert(ev) {
            dialogFactory.showAlert(ev);
        }
        function showConfirm(ev) {
            dialogFactory.showConfirm(ev);
        }
        function showAdvanced(ev) {
            dialogFactory.showAdvanced(ev);
        }
        function showTabDialog(ev) {
            dialogFactory.showTabDialog(ev);
        }
    }
})();
