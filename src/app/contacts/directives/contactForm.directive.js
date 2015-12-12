//This creates the directive that passes the controller for adding new contacts

(function() {
    'use strict';

    angular
        .module('app.contacts')
        .directive('gzContactForm', gzContactForm);

    function gzContactForm() {
        return {
            templateUrl: 'app/contacts/directives/contactForm.html',
            restrict: 'E',
            controller: ContactFormController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                contacts: '='
            }
        }
    }

    ContactFormController.$inject = ['contactService'];

    function ContactFormController(contactService) {
        var vm = this;

        vm.newContact = new contactService.Contact();
        vm.addContact = addContact;

        //study this
        function addContact() {
            vm.contacts.$add(vm.newContact);
            vm.newContact = new contactService.Contact();
        }
    }

})();