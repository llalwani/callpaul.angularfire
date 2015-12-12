(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('textMessageService', textMessageService);

  textMessageService.$inject = ['firebaseDataService'];

  function textMessageService(firebaseDataService) {
    var service = {
      sendTextMessage: sendTextMessage
    };

    return service;

    ////////////

    function sendTextMessage(contact, contacts) {
      var newTextMessage = {
        phoneNumber: 3124505311,
        stars: contact.stars,
        firstName: contact.firstName,
        lastName: contact.lastName
      };
      firebaseDataService.textMessages.push(newTextMessage);
      contact.notified = true;
      contacts.$save(contact);
    }
  }

})();