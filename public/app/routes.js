var app = angular.module('appRoutes', ['ngRoute'])

// Configure Routes; 'authenticated = true' means the user must be logged in to access the route
.config(function($routeProvider, $locationProvider) {

    // AngularJS Route Handler
    $routeProvider

    .when('/', {
        templateUrl: 'app/views/pages/about.html'
    })

    .when('/error', {
        templateUrl: 'app/views/pages/error.html'
    })

     .when('/products', {
        templateUrl: 'app/views/pages/try.html',
         controller: 'mainCtrl',
        controllerAs: 'main'
    })

     .when('/downloads',{
         templateUrl: 'app/views/pages/downloads.html',
         controller: 'mainCtrl',
        controllerAs: 'main'
     })

     .when('/subscriptions',{
         templateUrl: 'app/views/pages/subscriptions.html',
         controller: 'mainCtrl',
        controllerAs: 'main'
     })

    .otherwise({ redirectTo: '/error' }); 

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); 
});

