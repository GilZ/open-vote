'use strict';

angular.module('openVote', [
        'ui.router',
        'openVote.mainView'
    ])
    .config(['$urlRouterProvider', '$locationProvider',
        function ($urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.when('/', '/open-vote');
        }])
;
