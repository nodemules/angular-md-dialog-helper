(function() {
    'use strict';

    angular
        .module('wb-dialog-helper', [
            'ngMaterial'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('wb-dialog-helper')
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
            console.log('DialogController activated!');
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
        .module('wb-dialog-helper')
        .factory('dialogFactory', dialogFactory);

    dialogFactory.$inject = ['$mdDialog', '$mdMedia'];

    /* @ngInject */
    function dialogFactory($mdDialog, $mdMedia) {
        var defaults = {
            title: 'This is an alert title',
            content: 'You can specify some description text in here.',
            ariaLabel: 'Alert Dialog Demo',
            okLabel: 'Ok',
        };
        var customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        var service = {
            showAlert: showAlert,
            showConfirm: showConfirm,
            showAdvanced: showAdvanced,
        };

        return service;

        ////////////

        function build(dialog, ev, title, content, okLabel, ariaLabel) {
            title = title || defaults.title;
            content = content || defaults.content;
            ariaLabel = ariaLabel || defaults.ariaLabel;
            okLabel = okLabel || defaults.okLabel;

            return dialog
                .targetEvent(ev)
                .title(title)
                .textContent(content)
                .ariaLabel(ariaLabel)
                .ok(okLabel);
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

        function showAdvanced(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
            $mdDialog.show({
                    controller: 'DialogController',
                    controllerAs: 'vm',
                    templateUrl: '/views/app/dialog/dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    status = 'You said the information was "' + answer + '".';
                }, function() {
                    status = 'You cancelled the dialog.';
                });
        }

    }
})();
