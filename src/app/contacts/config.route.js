//this file creates the route that connects the url to the html and provides the controller. It requires authentication to be accessed.

(function() {
    'use strict';

    angular
        .module('app.contacts')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'app/contacts/contacts.html',
            controller: 'ContactsController',
            controllerAs: 'vm',
            resolve: {user: resolveUser}
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireAuth();
    }

})();