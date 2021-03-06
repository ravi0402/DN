

var app = angular.module('appRoutes', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

    $urlRouterProvider.otherwise('/error');

$stateProvider

 
    .state('error', {
        url: '/error',
        templateUrl: 'app/views/pages/error.html'
    })



    .state('partners', {
        url: '/partners',
        templateUrl: 'app/views/pages/partners/partners.html'
    })
    .state('partners.products', {
        url: '/products',
        templateUrl: 'app/views/pages/partners/productsNotFound.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
    .state('partners.outOfStock', {
        url: '/outOfStock',
        templateUrl: 'app/views/pages/partners/outOfStock.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
    .state('partners.townessCurrentInventory', {
        url: '/townessCurrentInventory',
        templateUrl: 'app/views/pages/partners/townessCurrentInventory.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
    .state('partners.chart', {
        url: '/chart',
        templateUrl: 'app/views/pages/partners/chart.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
     .state('partners.stockPrediction', {
        url: '/stockPrediction',
        templateUrl: 'app/views/pages/partners/stockPrediction.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
  


    .state('dnbi', {
        url: '/dnbi',
        templateUrl: 'app/views/pages/dnbi/dnbi.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
    .state('dnbi.downloads', {
        url: '/downloads',
        templateUrl: 'app/views/pages/dnbi/downloads.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
    .state('dnbi.subscriptions', {
        url: '/subscriptions',
        templateUrl: 'app/views/pages/dnbi/subscriptions.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
    .state('dnbi.vendorGrowth', {
        url: '/vendorGrowth',
        templateUrl: 'app/views/pages/dnbi/vendorGrowth.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })

    $locationProvider.html5Mode(true);
});