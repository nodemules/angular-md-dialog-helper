(function() {
'use strict';

    angular
        .module('example')
        .controller('ExampleDialogController', ExampleDialogController);

    ExampleDialogController.$inject = ['$mdDialog'];
    function ExampleDialogController($mdDialog) {
        var vm = this;
        vm.hide = hide;
        vm.cancel = cancel;
        vm.answer = answer;

        activate();

        function activate() {
            console.log('ExampleDialogController activated!');
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