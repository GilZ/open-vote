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

        $scope.currentVoteIndex = 0;

        $scope.vote = function(vote){
            if ($scope.votingEnded) {
                return;
            }
            
            $scope.bills[$scope.currentVoteIndex].userVoted = vote;
            $scope.currentVoteIndex++;
            if ($scope.currentVoteIndex >= $scope.bills.length) {
                $scope.votingEnded = true;
            }
        };

        $http.get('/api/bills')
            .success(function(res){
                $scope.bills = res;
            });
    }])
;