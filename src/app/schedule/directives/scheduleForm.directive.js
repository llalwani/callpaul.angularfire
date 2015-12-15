//This creates the directive that passes the controller for adding new contacts

(function() {
    'use strict';

    angular
        .module('app.schedule')
        .directive('ncScheduleForm', ncScheduleForm);

    function ncScheduleForm() {
        return {
            templateUrl: 'app/schedule/directives/scheduleForm.html',
            restrict: 'E',
            controller: ScheduleFormController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                contacts: '=',
                schedule: '=',
                calls: '='
            }
        }
    }

    ScheduleFormController.$inject = ['scheduleService'];

    function ScheduleFormController(scheduleService) {
        var vm = this;

        vm.scheduleSequence = scheduleSequence;
        console.log("vm.calls: ", vm.calls);
        console.log("vm.schedule: ", vm.schedule);

        function updateCallsPerWeekArray() {
            return Array.apply(null, {length: vm.callsPerWeek}).map(Number.call, Number);
        }

        function scheduleSequence() {
            var contacts = normalizeArray();
            var callsPerWeek = vm.callsPerWeek;
            var starsTotal = starsCounter();
            var sequence = arrayMaker();
            var unsortedSequence = sequenceScheduler();
            var sortedSequence = sortPerWeek();

            function normalizeArray(){
                var regularArray = [];
                for (var i = 0; i < vm.contacts.length; i++) {
                    regularArray.push(vm.contacts[i]);
                }
                return regularArray;
            }

            function starsCounter(){
                var sum = 0;
                for (var contact in contacts){
                    sum += contacts[contact].stars;
                }
                return sum;
            }

            //creates empty array with appropriate length
            function arrayMaker(){
                var madearray = Array.apply(null, new Array(starsTotal)).map(Boolean.prototype.valueOf,false);
                return madearray;
            }

            //put the fullName in the right slot
            function sequenceScheduler() {
                for (var contact in contacts) {
                    var placed = false;
                    var frequency = Math.ceil(starsTotal / contacts[contact].stars);
                    for (var i = 0; i < starsTotal; i += frequency) {
                        placed = false;
                        if (sequence[i] == false) {
                            sequence[i] = contacts[contact].fullName;
                        }
                        else if (sequence[i - 1] == false) {
                            sequence[i - 1] = contacts[contact].fullName;
                        }
                        else
                            while (placed == false && i <= starsTotal) {
                                i++;
                                if (sequence[i] == false) {
                                    sequence[i] = contacts[contact].fullName;
                                    placed = true;
                                }
                            }
                    }
                }
                return sequence;
            }

            function sortPerWeek() {
                var sortedSequence = [];
                //no parseInt required
                var chunk = vm.callsPerWeek;
                for (var i=0; i < unsortedSequence.length; i += chunk) {
                    var chunkArray = unsortedSequence.slice(i,i + chunk);
                    sortedSequence.push(chunkArray);
                }
                return sortedSequence;
            }


            function contactsPerWeekMaker() {
                var contactsPerWeekArray = [];
                var locale = "en-us";
                for (var i=0; i < sortedSequence.length; i ++) {
                    var objDate = new Date(Date.now() + 604800000 * i);
                    var month = objDate.toLocaleString(locale, { month: "short" });
                    var todayString = month + " " + objDate.getDate();
                    contactsPerWeekArray.push({
                            date: todayString,
                            contacts: sortedSequence[i]
                            //  dont save this to db - dateObj: objDate
                        }
                    );
                }
                return contactsPerWeekArray;
            }

            vm.schedule.$remove(vm.schedule[0]);
            vm.schedule.$add(contactsPerWeekMaker());

            vm.calls.$remove(vm.calls[0]);
            vm.calls.$add(updateCallsPerWeekArray());
        }
    }

})();










