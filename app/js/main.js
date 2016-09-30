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
        }).finally(function() {
            setUpInteractioncs($scope);
            $scope.users = _.sortBy($scope.users, function (user) {
                return user.interactions.length;
            }).reverse();
    });
}

function setUpInteractioncs($scope) {

    _.each($scope.interactions,function (interactionObj) {
        var usr = _.find($scope.users, function (userObj) {
            return userObj.id == interactionObj.user;
        });
        if(!usr.interactions) usr.interactions = [];
        usr.interactions.push(interactionObj);
        interactionObj.userObj = usr;

        var brnd = _.find($scope.brands, function (brandObj) {
            return brandObj.id == interactionObj.brand;
        });
        if(!brnd.interactions) brnd.interactions = [];
        brnd.interactions.push(interactionObj);
        interactionObj.brandObj = brnd;
    });
}

gaugeChallengeApp.controller('UserListController', function UserListController($scope, $http) {
    getData($http, $scope);
});

