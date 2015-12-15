//this file creates the route that connects the url to the html and provides the controller. It requires authentication to be accessed.

(function() {
    'use strict';

    angular
        .module('app.schedule')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/schedule', {
            templateUrl: 'app/schedule/schedule.html',
            controller: 'ScheduleController',
            controllerAs: 'vm',
            //I don't know what this does.
            resolve: {user: resolveUser}
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireAuth();
    }

})();
