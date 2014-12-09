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
        $scope.invoke = function(){
            $http.get('/api')
                .success(function(res){
                    console.log(res)
                });
        }
    }])
;