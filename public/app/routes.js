var app = angular.module('appRoutes', ['ngRoute'])

// Configure Routes; 'authenticated = true' means the user must be logged in to access the route
.config(function($routeProvider, $locationProvider) {

    // AngularJS Route Handler
    $routeProvider

    .when('/', {
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/error', {
        templateUrl: 'app/views/pages/error.html'
    })

     .when('/products', {
        templateUrl: 'app/views/pages/productsNotFound.html',
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

     .when('/daterange', {
        templateUrl: 'app/views/pages/posts.html',
         controller: 'mainCtrl',
        controllerAs: 'main'
    })

    .when('/outOfStock', {
        templateUrl: 'app/views/pages/outOfStock.html',
         controller: 'mainCtrl',
        controllerAs: 'main'
    })

  

    .otherwise({ redirectTo: '/error' }); 

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); 
});

