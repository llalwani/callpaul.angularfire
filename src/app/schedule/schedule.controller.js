//This is the controller that fetches the specific user's data from scheduleService.

(function() {
    'use strict';

    angular
        .module('app.schedule')
        .controller('ScheduleController', ScheduleController);

    ScheduleController.$inject = ['$rootScope', 'scheduleService', 'user'];

    function ScheduleController($rootScope, scheduleService, user) {
        var vm = this;

        vm.contacts = scheduleService.getContactsByUser(user.uid);
        vm.schedule = scheduleService.getScheduleByUser(user.uid);
        vm.callsPerWeekArray = scheduleService.getCallsPerWeekArrayByUser(user.uid);
        vm.calls = scheduleService.getCallsByUser(user.uid);


        $rootScope.$on('logout', function() {
            //Removes the current scope (and all of its children) from the parent scope. Removal implies that calls to $digest() will no longer propagate to the current scope and its children. Removal also implies that the current scope is eligible for garbage collection.
            vm.schedule.$destroy();
            vm.calls.$destroy();
        });
    }

})();