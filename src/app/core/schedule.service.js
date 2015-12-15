(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('scheduleService', scheduleService);

    scheduleService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function scheduleService($firebaseArray, firebaseDataService) {

        var service = {
            getContactsByUser: getContactsByUser,
            getScheduleByUser: getScheduleByUser,
            getCallsPerWeekArrayByUser: getCallsPerWeekArrayByUser,
            getCallsByUser: getCallsByUser
        };

        return service;

        ////////////
        //crucial. gets all the data
        function getContactsByUser(uid) {
            return $firebaseArray(firebaseDataService.users.child(uid).child('contacts'));
        }

        function getScheduleByUser(uid) {
            return $firebaseArray(firebaseDataService.users.child(uid).child('schedule'));
        }

        function getCallsPerWeekArrayByUser(uid) {
            return $firebaseArray(firebaseDataService.users.child(uid).child('callsPerWeekArray'));
        }

        function getCallsByUser(uid) {
            return $firebaseArray(firebaseDataService.users.child(uid).child('calls'));
        }

    }

})();
