/**
 * Created by john on 30/09/16.
 */
var gaugeChallengeApp = angular.module('gaugeChallengeApp', []);

gaugeChallengeApp.constant('_',
    window._
);

function getData($http, $scope) {
    $http.get('../app/json/users.json')
        .then(function (res) {
            $scope.users = res.data;
            return $http.get('../app/json/brands.json')
        }).then(function (res) {
            $scope.brands = res.data;
            return $http.get('../app/json/interactions.json');
        }).then(function (res) {
            $scope.interactions = res.data;
        });
}

gaugeChallengeApp.controller('UserListController', function UserListController($scope, $http) {
    getData($http, $scope);
});

gaugeChallengeApp.controller('InteractionListController', function UserListController($scope, $http) {
    for(var i = 0; i<$scope.users.length;i++){
        for(var j=0; j<$scope.interactions.length;j++){
            var user = $scope.users[i];
            var interaction = $scope.interactions[j];
            if(!user.interactions) user.interactions = [];
            if(user.id == interaction.user) {
                user.interactions.push(interaction);
            }
        }
        console.log($scope.users[i].interactions);
    }
});
