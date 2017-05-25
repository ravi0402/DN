var app = angular.module('mainController',['ngTable','ngTableToCsv'])

// Controller: mainCtrl is used to handle login and main index functions (stuff that should run on every page)  
.controller('mainCtrl', function( NgTableParams,$filter,$timeout, $http, $location, $rootScope, $window, $interval, $scope) {
    var self = this;


    $scope.daterange = function(date)
    {
        if(date!=null)
        {
            $http({method:'POST',
            url:'http://localhost:8085/api/daterange',
            dataType: 'json',
            data: { json: JSON.stringify(date) }})   
            .success(function (data,status) {
            
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
        }
    }

    $scope.outofStock = function()
    {
        $http.get('/api/outofstock').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.resul = $scope.tabledata;
                self.tabletParams = new NgTableParams({}, { dataset: resul});
            }
        });

    }


    $scope.products1 = function()
    {

        $http.get('/api/products1').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }
     $scope.products7 = function()
    {

        $http.get('/api/products7').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});

            }
        });
    }

    $scope.products30 = function()
    {

        $http.get('/api/products30').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }

    $scope.downloads7 = function()
    {
        $http.get('/api/download_reports7').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }

     $scope.downloads15 = function()
    {
        $http.get('/api/download_reports15').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }

    $scope.downloads30 = function()
    {
        $http.get('/api/download_reports30').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }

    $scope.subscriptions7 = function()
    {
        $http.get('/api/subscription_reports7').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }

    $scope.subscriptions15 = function()
    {
        $http.get('/api/subscription_reports15').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }

    $scope.subscriptions30 = function()
    {
        $http.get('/api/subscription_reports30').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        });
    }



    // function refresh()
    // {
    //     $http.get('/products',function(req,res){

    //     })
    // }
    // app.loadme = false; // Hide main HTML until data is obtained in AngularJS
    // if ($window.location.pathname === '/') app.home = true; // Check if user is on home page to show home page div


    // // Function to hide the modal
    // var hideModal = function() {
    //     $("#myModal").modal('hide'); // Hide modal once criteria met
    // };

    // // Check if user is on the home page
    // $rootScope.$on('$routeChangeSuccess', function() {
    //     if ($window.location.pathname === '/') {
    //         app.home = true; // Set home page div
    //     } else {
    //         app.home = false; // Clear home page div
    //     }
    // });



});
