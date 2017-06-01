var app = angular.module('mainController',['ngTable','ngTableToCsv','daterangepicker','oitozero.ngSweetAlert'])

// Controller: mainCtrl is used to handle login and main index functions (stuff that should run on every page)  
.controller('mainCtrl', function( NgTableParams,$filter,$timeout,SweetAlert,$http, $location, $rootScope, $window, $interval, $scope) {
    var self = this;

$scope.date = {startDate: null, endDate: null};

var d = new Date();
d.setDate(d.getDate() - 1);
dd = $filter("date")(d, 'yyyy-MM-dd');

$scope.datedefault = $filter("date")(dd, 'yyyy-MMM-dd');

$scope.today = new Date(); 
console.log($scope.today);

$scope.datepick = function(date){
    if(date==undefined || date==null)
    {
        date = $filter("date")(dd, 'yyyy-MM-dd');
    }
    var data = { json: date };

    $http.post('/api/datepick',data)
        .success(function (data,status) {
            
             $scope.tabledata =[];
            $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_pnf = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_pnf = $filter('filter')($scope.orderedData_pnf, params.filter());
                    params.total($scope.orderedData_pnf.length);
                    //return ($scope.orderedData_pnf.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        }).error(function(data) {
            SweetAlert.swal("Select valid date!"+ '\n'+"Selected date is from future!"); 
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
                
        $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_subs = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_subs = $filter('filter')($scope.orderedData_subs, params.filter());
                    params.total($scope.orderedData_subs.length);
                    //return ($scope.orderedData_subs.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
            }).error(function(data) {
                 SweetAlert.swal("Select valid date!"+ '\n'+"Selected date is from future!");
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

            
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_pnf = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_pnf = $filter('filter')($scope.orderedData_pnf, params.filter());
                    params.total($scope.orderedData_pnf.length);
                    //return ($scope.orderedData_pnf.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        }).error(function(data) {
            SweetAlert.swal("Select valid date!"+ '\n'+"Selected date is from future!");
            console.error("error in posting");

    });
    }
    }






$scope.vendorGrowth = function(datey){
 
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

    $http.post('/api/vendorGrowth',data)
        .success(function (data,status) {
            
            
            $scope.tabledata =[];
            $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_vg = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_vg = $filter('filter')($scope.orderedData_vg, params.filter());
                    params.total($scope.orderedData_vg.length);
                    //return ($scope.orderedData_vg.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        }).error(function(data) {
             SweetAlert.swal("Select valid date!"+ '\n'+"Selected date is from future!");
            console.error("error in posting");

    });
    }
    }
     $scope.vendorGrowth30 = function()
    {
        $http.get('/api/vendorGrowth30').success(function(data)

        {
            
            $scope.tabledata =[];
            $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_vg = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_vg = $filter('filter')($scope.orderedData_vg, params.filter());
                    params.total($scope.orderedData_vg.length);
                    //return ($scope.orderedData_vg.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }

    $scope.townessCurrentInventory = function()
    {


        $scope.selectedTestAccount = null;
        $scope.testAccounts = [];
        $http.get('/api/get_category').success(function(data)
        {
            $scope.testAccounts = data;
            var len = data.length;
            console.log(len);
            var map = new Object();
            map['category'] = 'All Categories';
            map['id'] = 0;
            $scope.testAccounts.push(map);
            console.log($scope.testAccounts);
        });
        
    $scope.getDataa = function(ss,testAccounts){
        for(var i=0;i<testAccounts.length;i++)
        {
            if(testAccounts[i]['category'] == ss['category'])
                k = testAccounts[i]['id'];
        }
        var data = { id: k } ;

         $http.post('/api/townessCurrentInventory',data)
        .success(function (data,status) {
             $scope.tabledata =[];
            $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_towness = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_towness = $filter('filter')($scope.orderedData_towness, params.filter());
                    params.total($scope.orderedData_towness.length);
                    //return ($scope.orderedData_towness.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
            }).error(function(data) {
                console.error("error in posting");
            });
         
     }

    }

    $scope.outofStock = function()
    {
        $http.get('/api/outofstock').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_outfs = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_outfs = $filter('filter')($scope.orderedData_outfs, params.filter());
                    params.total($scope.orderedData_outfs.length);
                    //return ($scope.orderedData_outfs.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });

    }





    $scope.products1 = function()
    {
        $http.get('/api/products1').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_pnf = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_pnf = $filter('filter')($scope.orderedData_pnf, params.filter());
                    params.total($scope.orderedData_pnf.length);
                    //return ($scope.orderedData_pnf.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }
    $scope.products7 = function()
    {
        $http.get('/api/products7').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_pnf = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_pnf = $filter('filter')($scope.orderedData_pnf, params.filter());
                    params.total($scope.orderedData_pnf.length);
                    //return ($scope.orderedData_pnf.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }
    $scope.products30 = function()
    {
        $http.get('/api/products30').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_pnf = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_pnf = $filter('filter')($scope.orderedData_pnf, params.filter());
                    params.total($scope.orderedData_pnf.length);
                    //return ($scope.orderedData_pnf.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }


    $scope.downloads7 = function()
    {
        $http.get('/api/download_reports7').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_dwnlds = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_dwnlds = $filter('filter')($scope.orderedData_dwnlds, params.filter());
                    params.total($scope.orderedData_dwnlds.length);
                    //return ($scope.orderedData_dwnlds.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }
    $scope.downloads15 = function()
    {
        $http.get('/api/download_reports15').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_dwnlds = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_dwnlds = $filter('filter')($scope.orderedData_dwnlds, params.filter());
                    params.total($scope.orderedData_dwnlds.length);
                    //return ($scope.orderedData_dwnlds.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }
    $scope.downloads30 = function()
    {
        $http.get('/api/download_reports30').success(function(data)
        {
        $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_dwnlds = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_dwnlds = $filter('filter')($scope.orderedData_dwnlds, params.filter());
                    params.total($scope.orderedData_dwnlds.length);
                    //return ($scope.orderedData_dwnlds.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }







    $scope.subscriptions7 = function()
    {
        $http.get('/api/subscription_reports7').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_subs = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_subs = $filter('filter')($scope.orderedData_subs, params.filter());
                    params.total($scope.orderedData_subs.length);
                    //return ($scope.orderedData_subs.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }
    $scope.subscriptions15 = function()
    {
        $http.get('/api/subscription_reports15').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_subs = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_subs = $filter('filter')($scope.orderedData_subs, params.filter());
                    params.total($scope.orderedData_subs.length);
                    //return ($scope.orderedData_subs.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }
        });
    }
    $scope.subscriptions30 = function()
    {
        $http.get('/api/subscription_reports30').success(function(data)
        {
         $scope.tabledata =[];
        $scope.tabledata = data;
         if($scope.tabledata !=null)
         {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.orderedData_subs = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_subs = $filter('filter')($scope.orderedData_subs, params.filter());
                    params.total($scope.orderedData_subs.length);
                    //return ($scope.orderedData_subs.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
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
