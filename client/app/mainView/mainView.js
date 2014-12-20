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

        var userVotes = {};

        $scope.currentVoteIndex = 0;

        $scope.vote = function(vote){
            if ($scope.votingEnded) {
                return;
            }
            
            $scope.bills[$scope.currentVoteIndex].userVoted = vote;
            $scope.currentVoteIndex++;
            if ($scope.currentVoteIndex >= $scope.bills.length) {
                $scope.votingEnded = true;

                _.each($scope.bills, function(bill) {
                   userVotes[bill.id] = bill.userVoted;
                });

                $http.post('/api/bills', userVotes)
                   .success(function(res) {
                      console.log(res);
                   });
            }
        };

        $scope.changeVote = function(index) {
            if ($scope.votingEnded || !$scope.bills[index].userVoted) {
                return;
            }
            delete $scope.bills[index].userVoted;
            $scope.currentVoteIndex = index;
        };

        $http.get('/api/bills')
            .success(function(res){
                $scope.bills = res;
            });
    }])
;