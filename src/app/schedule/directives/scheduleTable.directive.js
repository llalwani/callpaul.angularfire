//This creates the directive that passes the controller for adding new contacts

(function() {
    'use strict';

    angular
        .module('app.schedule')
        .directive('ncScheduleTable', ncScheduleTable);

    function ncScheduleTable() {
        return {
            templateUrl: 'app/schedule/directives/scheduleTable.html',
            restrict: 'E',
            controller: ScheduleTableController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                contacts: '=',
                schedule: '=',
                calls: '='
            }
        }
    }

    ScheduleTableController.$inject = ['scheduleService'];

    function ScheduleTableController(scheduleService) {
        //using vm is like using scope
        var vm = this;

        //vm.contacts = scheduleService.getContactsByUser();
        //var schedule = scheduleService.getScheduleByUser();
        //var callsPerWeekArray = scheduleService.getCallsPerWeekArray();

        //vm.schedule = $firebase(schedule).$asArray();
        //vm.callsPerWeekArray = $firebase(callsPerWeekArray).$asArray();
    }

})();