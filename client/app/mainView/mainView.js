'use strict';

angular.module('openVote.mainView', [])

    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider.state('openVote', {
            url: '/open-vote',
            templateUrl: 'mainView/mainView.html',
            controller: 'mainController'
        });
    }])
    .controller('mainController', [ '$scope', '$http', function ($scope, $http) {

        $http.get('/api/bills')
            .success(function(res){
                $scope.bills = res;
            });
    }])
;