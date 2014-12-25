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
    .filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }])
    .constant('VOTING_URL', '/api/bills')
    .controller('mainController', [ '$scope', '$http', '$timeout', 'VOTING_URL', function ($scope, $http, $timeout, VOTING_URL) {


        function startVoting() {
            // Init variables
            $scope.currentVoteIndex = 0;
            $scope.votingStatus = 'VOTING';

            // Get votes from server
            $http.get(VOTING_URL)
                .success(function (res) {
                    $scope.bills = res;
                })
                .error(function (err) {
                    console.log('Unable to obtain votes, received: ' + err);
                })
            ;
        }


        $scope.vote = function (vote) {
            if ($scope.votingStatus !== 'VOTING') {
                return;
            }

            $scope.bills[$scope.currentVoteIndex].userVoted = vote;
            $scope.currentVoteIndex++;
            if ($scope.currentVoteIndex >= $scope.bills.length) {
                $scope.votingStatus = 'PENDING_RESULTS';
            }
        };

        $scope.changeVote = function (index) {
            if ($scope.votingStatus === 'ENDED' || !$scope.bills[index].userVoted) {
                return;
            }
            $scope.votingStatus = 'VOTING';
            delete $scope.bills[index].userVoted;
            $scope.currentVoteIndex = index;
        };

        $scope.endVoting = function () {

            var userVotes = {},
                matches = {},
                AGREED_FACTOR = 1 / $scope.bills.length;

            $scope.votingStatus = 'CALCULATING_RESULTS';

            $timeout(function () {
                $scope.votingStatus = 'ENDED';
            }, Math.random() * 3000);

            _.each($scope.bills, function (bill) {
                userVotes[bill.id] = bill.userVoted;
                _.each(bill[bill.userVoted], function (party) {
                    matches[party] = (matches[party] || 0) + AGREED_FACTOR;
                });
            });

            $scope.matches = _.toArray(matches);

            $http.post(VOTING_URL, userVotes);
        };

        $scope.restart = startVoting;

        startVoting();
    }])
;