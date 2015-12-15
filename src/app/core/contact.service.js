(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('contactService', contactService);

  contactService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function contactService($firebaseArray, firebaseDataService) {

    var service = {
      getContactsByUser: getContactsByUser,
      Contact: Contact
    };

    return service;

    ////////////
    //crucial. gets all the data
    function getContactsByUser(uid) {
      return $firebaseArray(firebaseDataService.users.child(uid).child('contacts'));
    }
//this is what I need to modify
    function Contact() {
      this.firstName = '';
      this.lastName = '';
      this.stars = '';
      this.fullName = this.firstName + this.lastName
    }
  }

})();