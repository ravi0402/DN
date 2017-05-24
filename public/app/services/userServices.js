angular.module('userServices', [])

.factory('User', function($http) {
    var userFactory = {}; // Create the userFactory object

    userFactory.getUsers = function() {
        return $http.get('/api/products/');
    };
    return userFactory;
});

