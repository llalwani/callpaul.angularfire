(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = ['FIREBASE_URL'];

  function firebaseDataService(FIREBASE_URL  ) {
    var root = new Firebase(FIREBASE_URL);

    //creating the tree in the DB
    var service = {
      root: root,
      users: root.child('users'),
      emails: root.child('emails'), //this is given at login. Why not stored under users?
      textMessages: root.child('textMessages') //I might delete this
    };

    return service;
  }

})();