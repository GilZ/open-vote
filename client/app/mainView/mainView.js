'use strict';

angular.module('openVote.mainView', [])

    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider.state('openVote', {
            url: '/open-vote',
            templateUrl: 'mainView/mainView.html',
            controller: 'mainController as ballot'
        });
    }])
    .filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }])
    .constant('VOTING_URL', '/api/bills')
    .controller('mainController', [ '$scope', '$http', '$timeout', 'VOTING_URL', function ($scope, $http, $timeout, VOTING_URL) {

        var ballot = this;


        function startVoting() {
            // Init variables
            ballot.currentVoteIndex = 0;
            ballot.votingStatus = 'VOTING';

            // Get bills from server
            $http.get(VOTING_URL)
                .success(function (res) {
                    ballot.bills = res;
                })
                .error(function (err) {
                    console.log('Unable to obtain votes, received: ' + err);
                })
            ;
        }


        ballot.vote = function (vote) {
            if (ballot.votingStatus !== 'VOTING') {
                return;
            }

            ballot.bills[ballot.currentVoteIndex].userVoted = vote;
            ballot.currentVoteIndex++;
            if (ballot.currentVoteIndex >= ballot.bills.length) {
                ballot.votingStatus = 'PENDING_RESULTS';
                ballot.endVoting();
            }
        };

        ballot.endVoting = function () {

            var userVotes = {},
                matches = {},
                AGREED_FACTOR = 1 / ballot.bills.length;

            ballot.votingStatus = 'CALCULATING_RESULTS';

            $timeout(function () {
                ballot.votingStatus = 'ENDED';
            }, (Math.random() * 3000) + 1000); // give at least a second

            _.each(ballot.bills, function (bill) {
                userVotes[bill.id] = bill.userVoted;
                _.each(bill[bill.userVoted], function (party) {
                    matches[party] = (matches[party] || 0) + AGREED_FACTOR;
                });
            });

            ballot.matches = _.toArray(matches);

            $http.post(VOTING_URL, userVotes);
        };

        ballot.restart = startVoting;

        startVoting();
    }])
;