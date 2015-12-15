(function() {
    'use strict';

    angular
        .module('app.contacts')
        .directive('gzContactTable', gzContactTable);

    function gzContactTable() {
        return {
            templateUrl: 'app/contacts/directives/contactTable.html',
            restrict: 'E',
            controller: ContactTableController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                contacts: '='
            }
        }
    }

    ContactTableController.$inject = ['textMessageService'];

    function ContactTableController(textMessageService) {
        var vm = this;

        vm.removeContact = removeContact;
        vm.sendTextMessage = sendTextMessage;
        vm.toggleDone = toggleDone;
        vm.editContact = editContact;
        vm.doneEditing = doneEditing;
        vm.starsUp = starsUp;
        vm.starsDown = starsDown;

        function removeContact(contact) {
            vm.contacts.$remove(contact);
        }

        function sendTextMessage(contact) {
            textMessageService.sendTextMessage(contact, vm.contacts);
        }

        function toggleDone(contact) {
            vm.contacts.$save(contact);
        }

        vm.editedContact = null;
        vm.sortField = '-stars';
        vm.reverse = true;
        //you need to fix this eventually
        vm.availableOptions = [1,2,3,4,5];
        vm.stars = 1;

        function editContact(contact){
            vm.editedContact = contact;
            //I don't think this is useful.
            vm.originalContact = angular.extend({}, vm.editedContact);
        }

        function doneEditing(contact){
            contact.fullName = contact.firstName + " " + contact.lastName;
            vm.editedContact = null;
            vm.contacts.$save(contact);
        }

        function starsUp(contact) {
            if(contact.stars === 5) { return; }
            contact.stars += 1;
        }

         function starsDown(contact) {
            if(contact.stars === 1) { return; }
             contact.stars -= 1;
        }
    }

})();









