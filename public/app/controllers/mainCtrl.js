var app = angular.module('mainController',['ngTable','ngTableToCsv','daterangepicker','oitozero.ngSweetAlert'])

// Controller: mainCtrl is used to handle login and main index functions (stuff that should run on every page)  
.controller('mainCtrl', function( NgTableParams,$filter,$timeout,SweetAlert,$http, $location, $rootScope, $window, $interval, $scope) {
    var self = this;

$scope.date = {startDate: null, endDate: null};

var d = new Date();
d.setDate(d.getDate() - 1);
dd = $filter("date")(d, 'yyyy-MM-dd');



$scope.datedefault = $filter("date")(dd, 'yyyy-MMM-dd');



$scope.datepick = function(date){
    if(date==undefined)
    {
        date = $filter("date")(dd, 'yyyy-MM-dd');
    }

    var data = { json: date };

    $http.post('/api/datepick',data)
        .success(function (data,status) {
            
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        }).error(function(data) {
            console.error("error in posting");

    });
    }

$scope.drangeSubs = function(datey){

    if(datey.startDate == null || datey.startDate == undefined  || datey.endDate == null || datey.endDate == undefined)
    {

        SweetAlert.swal("Please select date range!"); 

    }
    else
    {
        start = $filter("date")(datey.startDate._d, 'yyyy-MM-dd');
        end = $filter("date")(datey.endDate._d, 'yyyy-MM-dd');
        var data = { startDate: start,
                 endDate: end } ;

        $http.post('/api/drangeSubs',data)
            .success(function (data,status) {
                
                var tabledata =[];
                $scope.tabledata = data;
                if(tabledata!=null)
                {
                    var result = [];
                    $scope.result = $scope.tabledata;
                    self.tableParams = new NgTableParams({}, { dataset: result});
                }
            }).error(function(data) {
                
                console.error("error in posting");
    });
    }

}



$scope.drangeProducts = function(datey){
 
    if(datey.startDate == null || datey.startDate == undefined  || datey.endDate == null || datey.endDate == undefined)
    {
        SweetAlert.swal("Please select date range!"); 
     
    }
    else 
    {
       start = $filter("date")(datey.startDate._d, 'yyyy-MM-dd');
        end = $filter("date")(datey.endDate._d, 'yyyy-MM-dd');
    
    var data = { startDate: start,
                 endDate: end } ;

    $http.post('/api/drangeProducts',data)
        .success(function (data,status) {
            
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var result = [];
                $scope.result = $scope.tabledata;
                self.tableParams = new NgTableParams({}, { dataset: result});
            }
        }).error(function(data) {
            console.error("error in posting");

    });
    }
    }









    $scope.townessCurrentInventory = function()
    {
        $http.get('/api/townessCurrentInventory').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var resul = [];
                $scope.resul = $scope.tabledata;
                self.tabletParams = new NgTableParams({}, { dataset: resul});
            }
        });

    }

    $scope.outofStock = function()
    {
        $http.get('/api/outofstock').success(function(data)
        {
            var tabledata =[];
            $scope.tabledata = data;
            if(tabledata!=null)
            {
                var resul = [];
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




    $scope.vendorgrowth = function()
    {


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
