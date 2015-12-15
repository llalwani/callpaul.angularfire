//This is the controller that fetches the specific user's data from contactService.

(function() {
    'use strict';

    angular
        .module('app.contacts')
        .controller('ContactsController', ContactsController);

    ContactsController.$inject = ['$rootScope', 'contactService', 'user'];

    function ContactsController($rootScope, contactService, user) {
        var vm = this;

        vm.contacts = contactService.getContactsByUser(user.uid);

        $rootScope.$on('logout', function() {
            vm.contacts.$destroy();
        });
    }

})();