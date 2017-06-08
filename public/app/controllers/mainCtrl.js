var app = angular.module('mainController',['ngTable','ngTableToCsv','daterangepicker','googlechart','oitozero.ngSweetAlert'])

// Controller: mainCtrl is used to handle login and main index functions (stuff that should run on every page)  
.controller('mainCtrl', function( NgTableParams,$filter,$timeout,SweetAlert,$http, $location, $rootScope, $window, $interval, $scope) {
    var self = this;

$scope.date = {startDate: null, endDate: null};

var d = new Date();
d.setDate(d.getDate() - 1);
dd = $filter("date")(d, 'yyyy-MM-dd');

$scope.datedefault = $filter("date")(dd, 'yyyy-MMM-dd');

$scope.today = new Date();

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

$scope.vendor_chart = function() {
    $scope.selectedVendor1 = null;
    $scope.selectedVendor2 = null;
    $scope.Vendors = [];
    $http.get('/api/getVendor').success(function (data) {
        $scope.Vendors = data;
    });
    $scope.selectedParameter = null;
    $scope.Parameters = ['id',
        'vendor_id',
        'vendor_name',
        'online_collection',
        'inventory_amount',
        'milk_litres_sold',
        'daily_commission',
        'vendor_payables',
        'date',
        'created_at',
        'updated_at',
        'cash_collected',
        'avg_wallet_balance',
        'exception_users',
        'milk_ticket_size',
        'non_milk_ticket_size',
        'total_ticket_size',
        'ordered_customers'];


    $scope.compareVendor = function (v1, v2, datey, selectedParameter) {

        if (datey.startDate == null || datey.startDate == undefined || datey.endDate == null || datey.endDate == undefined) {

            SweetAlert.swal("Please select date range!");

        }
        else {
            var parentProvider1 = v1['parent_provider'];
            var parentProvider2 = v2['parent_provider'];


            start = $filter("date")(datey.startDate._d, 'yyyy-MM-dd');
            end = $filter("date")(datey.endDate._d, 'yyyy-MM-dd');
            console.log('lala');
            var data1 = {
                parentProvider: parentProvider1,
                startDate: start,
                endDate: end
            };
            var data2 = {
                parentProvider: parentProvider2,
                startDate: start,
                endDate: end
            };

            console.log(data2);
            $http.post('/api/vendor_performance', data1)
                .success(function (data, status) {
                    $scope.tabledata1 = [];
                    $scope.tabledata1 = data;
                    console.log($scope.tabledata1);

                }).error(function (data) {
                SweetAlert.swal("Select valid date!" + '\n' + "Selected date is from future!");
                console.error("error in posting");
            });

            $http.post('/api/vendor_performance', data2)
                .success(function (data, status) {
                    $scope.tabledata2 = [];
                    $scope.tabledata2 = data;
                    console.log($scope.tabledata2);

                }).error(function (data) {
                SweetAlert.swal("Select valid date!" + '\n' + "Selected date is from future!");
                console.error("error in posting");
            });

        }

        $scope.myChartObject = {};
        $scope.hideSeries = hideSeries;


        init($scope.tabledata1,$scope.tabledata2,selectedParameter);

        function hideSeries(selectedItem) {
            var col = selectedItem.column;
            if (selectedItem.row === null) {
                if ($scope.myChartObject.view.columns[col] == col) {
                    $scope.myChartObject.view.columns[col] = {
                        label: $scope.myChartObject.data.cols[col].label,
                        type: $scope.myChartObject.data.cols[col].type,
                        calc: function () {
                            return null;
                        }
                    };
                    $scope.myChartObject.options.colors[col - 1] = '#CCCCCC';
                }
                else {
                    $scope.myChartObject.view.columns[col] = col;
                    $scope.myChartObject.options.colors[col - 1] = $scope.myChartObject.options.defaultColors[col - 1];
                }
            }
        }

        function init(vend1,vend2,selectedParameter) {

            $scope.myChartObject.type = "LineChart";
            $scope.myChartObject.displayed = false;


                function processArray(vend1,vend2,selectedParameter) {
                  var chartData = [];
                  // l1 = vend1.length;
                  // l2 = vend2.length;
                  //var leng = (l1 >= l2) ? l1:l2 ;
                  for (var i = 0 ; i< 2; i++)
                  {
                    chartData.push({ c: [ { v: vend1[i]['date']}, {v:vend1[i][selectedParameter]}]});
                  }
                  return chartData;
                }
            var chartData = processArray(vend1,vend2,selectedParameter);
            $scope.myChartObject.data = {"cols": [
              { label: "Dates", type: "string"},
              { label: selectedParameter , type: "number"}
              ], "rows": chartData
            };

            $scope.myChartObject.options = {
                "title": "Sales per month",
                "colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
                "defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Date"
                }
            };

            $scope.myChartObject.view = {
                columns: [0, 1, 2, 3, 4]
            };
        }

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


        $scope.selectedCategory = null;
        $scope.Categories = [];
        $http.get('/api/get_category').success(function(data)
        {
            $scope.Categories = data;
            var len = data.length;
            var map = new Object();
            map['category'] = 'All Categories';
            map['id'] = 0;
            $scope.Categories.push(map);
        });
    $scope.getDataa = function(ss,Categories){
                k = ss['id'];
        
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


    $scope.stockPrediction = function()
    {

        $scope.selectedCategory = null;
        $scope.Categories = [];
        $http.get('/api/get_category').success(function(data)
        {
            $scope.Categories = data;
            var len = data.length;
            var map = new Object();
            map['category'] = 'All Categories';
            map['id'] = 0;
            $scope.Categories.push(map);
        });

    $scope.predict = function(ss,datey){
        
         if( ss == null || ss == undefined || datey.startDate == null || datey.startDate == undefined  || datey.endDate == null || datey.endDate == undefined)
        {
            SweetAlert.swal("Please select date range!"); 
         
        }
        else 
        {
           start = $filter("date")(datey.startDate._d, 'yyyy-MM-dd');
            end = $filter("date")(datey.endDate._d, 'yyyy-MM-dd');
        }
        k = ss['id'];
        var data = { id: k ,
                    startDate: start,
                     endDate: end } ;

         $http.post('/api/stock_prediction',data)
        .success(function (data,status) {
            
             $scope.tabledata =[];
            $scope.tabledata = data.arr_new;
            $scope.dates = data.dates;


            for(var j=0;j<$scope.tabledata.length;j++)
            {
                //var keys = [];
                //var keys = Object.keys(arr_new[0]);
                for(var i=0; i<$scope.dates.length ;i++)
                { 
                    var z = $scope.dates[i];
                    if($scope.tabledata[j][z] >= 1)
                    {
                        continue;
                    }
                    else
                    {
                        $scope.tabledata[j][z] = 'N/A';
                    }
                }
                
            }


         if($scope.tabledata !=null)
           {
            $scope.filter = {
                key: undefined,
                failed: undefined
            };
            $scope.columns = [];
            var mapp = new Object();
            mapp['title'] = 'Product Parent_id';
            mapp['field'] = 'product_parent_id';
            $scope.columns.push(mapp);
            var mapp = new Object();
            mapp['title'] = 'Product Name';
            mapp['field'] = 'product';
            mapp['filter'] ={ product: 'text'};
            mapp['sortable']="'product'";
            $scope.columns.push(mapp);

            for(var  k=0;k<$scope.dates.length ;k++)
            {
                var mapp = new Object();
                mapp['title'] = $scope.dates[k];
                mapp['field'] = $scope.dates[k];
                $scope.columns.push(mapp);


            }
            $scope.tableParams =  new NgTableParams({
                page: 5,
                count: 10,
                filter: $scope.filter
            }, {
                debugMode: true,
                total: $scope.tabledata.length,
                getData: function(params) {
                    $scope.datess = $scope.dates;
                    $scope.orderedData_stockpre = params.sorting() ? $filter('orderBy')($scope.tabledata, params.orderBy()) : $scope.tabledata;
                    $scope.orderedData_stockpre = $filter('filter')($scope.orderedData_stockpre, params.filter());
                    params.total($scope.orderedData_stockpre.length);
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
