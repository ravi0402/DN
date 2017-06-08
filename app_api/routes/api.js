require('./db');
var express = require('express');
var router = express.Router();


router.get('/getVendor', function (req, res, next) {

    client.query("SELECT name,parent_provider_id as parent_provider FROM vendor" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});

router.post('/vendor_performance', function (req, res, next) {
    console.log(req.body);
    var start_Date = req.body.startDate ;
    var end_Date = req.body.endDate ;
    var parent_Provider = req.body.parentProvider;
    console.log(start_Date);
    client.query("SELECT * FROM vendor_settlements WHERE vendor_id ='"+ parent_Provider +"' AND date >='"+ start_Date+ "' AND date <='" + end_Date +"'", function(err, results) {
        //var keyy = Object.keys(results[0]);
        if(err){
            throw err;

        }
        res.json(results);
    });

});




router.post('/datepick', function (req, res, next) {
    var date_new = req.body.json;
    client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date= '"+ date_new +"' GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var total_cost = 0;
        var total_count = 0;
        for(var i=0;i<results.length;i++)
        {
            total_count += results[i].order_count ;
            total_cost += results[i].cost ;
        }
       
        var map = new Object();
        map['product_name'] = 'Total';
        map['order_count'] = total_count;
        map['cost'] = total_cost;
        results.push(map);
        res.json(results);
    });
        
});








router.get('/products1', function (req, res, next) {
        
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 1 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var total_cost = 0;
        var total_count = 0;
        for(var i=0;i<results.length;i++)
        {
            total_count += results[i].order_count ;
            total_cost += results[i].cost ;
        }
       
        var map = new Object();
        map['product_name'] = 'Total';
        map['order_count'] = total_count;
        map['cost'] = total_cost;
        results.push(map);
        res.json(results);
    });
});

router.get('/products7', function (req, res, next) {
        
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 7 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }

       var total_cost = 0;
        var total_count = 0;
        for(var i=0;i<results.length;i++)
        {
            total_count += results[i].order_count ;
            total_cost += results[i].cost ;
        }
       
        var map = new Object();
        map['product_name'] = 'Total';
        map['order_count'] = total_count;
        map['cost'] = total_cost;
        results.push(map);
        res.json(results);
    });
});
router.get('/products30', function (req, res, next) {
        
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 30 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }
var total_cost = 0;
        var total_count = 0;
        for(var i=0;i<results.length;i++)
        {
            total_count += results[i].order_count ;
            total_cost += results[i].cost ;
        }
       
        var map = new Object();
        map['product_name'] = 'Total';
        map['order_count'] = total_count;
        map['cost'] = total_cost;
        results.push(map);
        res.json(results);
    });
});

router.post('/drangeProducts', function (req, res, next) {
    var startDate = req.body.startDate ; 
    var endDate = req.body.endDate ;     
    //console.log(startDate);
    //console.log(endDate);
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date >'"+ startDate +"' and do.order_date < '"+endDate+"' GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var total_cost = 0;
        var total_count = 0;
        for(var i=0;i<results.length;i++)
        {
            total_count += results[i].order_count ;
            total_cost += results[i].cost ;
        }
       
        var map = new Object();
        map['product_name'] = 'Total';
        map['order_count'] = total_count;
        map['cost'] = total_cost;
        results.push(map);
        res.json(results);
    });
});











router.post('/stock_prediction', function (req, res, next) {
    var idd = req.body.id;
    var endDate = req.body.endDate;
    var startDate = req.body.startDate;
    if(idd=='0')
    {
        var str ="IS NOT NULL";
    }
    else
    {
        //console.log(idd);
        var str = "='"+idd.toString()+"'";
    }  

    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    var getDates = function(startDate, endDate) {
          var dates = [],
              currentDate = startDate,
              addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
              };
          while (currentDate <= endDate) {
            dates.push(currentDate.toString().slice(0,10));
            currentDate = addDays.call(currentDate, 1);
          }
          return dates;
        };

// Usage
var dates = getDates(new Date(startDate), new Date(endDate));

    client.query("SELECT df.product_parent_id , df.order_date , df.product_name,df.product_unit_size, df.order_quantity,pc.name FROM daily_fulfillment_analysis df JOIN product_parent pp ON df.product_parent_id  = pp.id INNER JOIN product_category pc ON pp.product_category = pc.id WHERE order_date >='"+ startDate +"' and order_date <= '"+endDate+"' AND pp.product_category "+str+" ORDER BY df.product_name",function(err, results)
    {
        if(err)
        {
            throw err;
        }
       
       var flag = 0 ;

    arr = [];
    arr_new =[];
    for( var i=0;i<results.length;i++)
    {
        
        var z = results[i].product_parent_id;
        var map = new Object();
        flag = 1;
        for(var k=i+1;k<results.length;k++)
        {
            if(flag==1)
            {
                var date = results[i]['order_date'].toString().slice(0,10);
                map['product'] = results[i].product_name + " : " + results[i].product_unit_size;
                map['product_parent_id'] = results[i]['product_parent_id'];
                map[date] = results[i].order_quantity;
                flag=0;
            }
            if(results[k].product_parent_id == z && flag == 0)
            {
                var date = results[k]['order_date'].toString().slice(0,10);
                map['product'] = results[k].product_name + " : " + results[k].product_unit_size;
                map['product_parent_id'] = results[k]['product_parent_id'];
                map[date] = results[k].order_quantity;
                z= results[k].product_parent_id;
                i=k;
                flag=0;
            }
        }
        arr_new.push(map);
    }

   data = {
    arr_new : arr_new,
    dates : dates
   };

res.json(data);  
    });
});

    
router.post('/townessCurrentInventory', function (req, res, next) {
    var idd = req.body.id;
    if(idd=='0')
    {
        var str ="IS NOT NULL";
    }
    else
    {
        console.log(idd);
        var str = "='"+idd.toString()+"'";
    }  

client.query("SELECT pp.id AS dn_id , pp.external_system_id AS towness_id, pp.product_name, pp.product_unit_price, inv.quantity, inv.last_sync_quantity, pp.min_order_size, pp.dn_order_size FROM product_parent pp JOIN inventory inv ON inv.product_parent_id = pp.id WHERE pp.external_supplier_id = 5 AND pp.status = 1 AND pp.product_category "+ str +" ORDER BY product_name ASC" , function(err, results) {
        if (err)
        {
            throw err;
        }
        console.log(results);
        res.json(results);
    });
});


router.get('/get_category', function (req, res, next) {
        
client.query("SELECT id,name AS category FROM product_category" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});















router.get('/download_reports7', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as download_count FROM user u LEFT JOIN building b ON u.building = b.id  WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 7 DAY) GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }

        res.json(results);
    });
});

router.get('/download_reports15', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as download_count FROM user u LEFT JOIN building b ON u.building = b.id  WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 15 DAY) GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});

router.get('/download_reports30', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as download_count FROM user u LEFT JOIN building b ON u.building = b.id  WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 30 DAY) GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }
        res.json(results);
    });
});








router.get('/subscription_reports7', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as subscription_count FROM user u JOIN building b ON u.building = b.id JOIN billing_master bm ON u.billing_master_id  = bm.id WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 7 DAY) AND bm.amount < 0 GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var  k = 0 ;
        for(var i=0;i<results.length;i++)
        {
            k += results[i].subscription_count ;
        }
       
        var map = new Object();
        map['building_name'] = 'Total';
        map['subscription_count'] = k;
        results.push(map);
        res.json(results);
    });
});

router.get('/subscription_reports15', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as subscription_count FROM user u JOIN building b ON u.building = b.id JOIN billing_master bm ON u.billing_master_id  = bm.id WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 15 DAY) AND bm.amount < 0 GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var  k = 0 ;
        for(var i=0;i<results.length;i++)
        {
            k += results[i].subscription_count ;
        }
       
        var map = new Object();
        map['building_name'] = 'Total';
        map['subscription_count'] = k;
        results.push(map);
        res.json(results);
    });
});

router.get('/subscription_reports30', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as subscription_count FROM user u JOIN building b ON u.building = b.id JOIN billing_master bm ON u.billing_master_id  = bm.id WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 30 DAY) AND bm.amount < 0 GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var  k = 0 ;
        for(var i=0;i<results.length;i++)
        {
            k += results[i].subscription_count ;
        }
        
        var map = new Object();
        map['building_name'] = 'Total';
        map['subscription_count'] = k;
        results.push(map);
        res.json(results);
    });
});

router.post('/drangeSubs', function (req, res, next) {
    var startDate = req.body.startDate ; 
    var endDate = req.body.endDate ;     
client.query("select b.building_name, COUNT(*) as subscription_count from user u join building b on u.building = b.id join billing_master bm on u.billing_master_id  = bm.id where u.created_at >= '"+ startDate +" 00:00:00' and u.created_at < '"+endDate+" 00:00:00' and bm.amount < 0 group by b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var  k = 0 ;
        console.log(results);
        for(var i=0;i<results.length;i++)
        {
            k += results[i].subscription_count ;
        }
        
        var map = new Object();
        map['building_name'] = 'Total';
        map['subscription_count'] = k;
        results.push(map);
        res.json(results);
    });
});








router.get('/outofstock', function (req, res, next) {
        
client.query("SELECT DISTINCT(pm.product_name) AS product_name, pm.product_unit_size AS unit_size, pm.product_unit_price AS unit_cost, pc.name AS product_category FROM product_master pm JOIN product_category pc ON pm.product_category = pc.id WHERE pm.status = 2 AND pm.fulfilled_by_vendor = 0 ORDER BY product_category" , function(err, results) {
        if (err)
        {
            throw err;
        }

        res.json(results);
    });
});









router.post('/vendorGrowth', function (req, res, next) {
 var startDate = req.body.startDate ; 
    var endDate = req.body.endDate ;        
client.query("SELECT b.vendor_name, COUNT(u.user_name) as user_count FROM building b JOIN `user` u ON b.id = u.building WHERE u.created_at <= '"+ endDate + "00:00:00' AND u.created_at >= '"+ startDate + " 00:00:00' GROUP BY u.building" , function(err, results) {
        if (err)
        {
            throw err;
        }

        res.json(results);
    });
});

router.get('/vendorGrowth30', function (req, res, next) {        
client.query("SELECT b.vendor_name, COUNT(u.user_name) as user_count FROM building b JOIN `user` u ON b.id = u.building WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 30 DAY) GROUP BY u.building" , function(err, results) {
        if (err)
        {
            throw err;
        }

        res.json(results);
    });
});








router.get('*', function (req, res, next) {
        res.send('Error 404!!!');
});
router.post('*', function (req, res, next) {
        res.send('Error 404!!!');
});
module.exports = router ;







   
            // //console.log(m);
            // var map = new Object();
            //  for(var k = 0;k < diffDays ;k++)
            //         {  
            //             var mm = results[i].product_name;
            //             if(i==0)
            //             {
                            
            //                 var date = results[i].order_date.toString().slice(0,11);
            //                 console.log(date);
            //                  map[date] = results[i].order_quantity;
            //                  map['product'] = results[i].product_name + ' : ' + results[i].product_unit_size;
            //                  map['product_parent_id '] = results[i].product_parent_id ; 
            //                  i++;
            //             }
            //             else
            //              {
            //                 if(results[i].product_name == mm)
            //                 {
            //                     var date = results[i].order_date.toString().slice(0,11);
            //                      map[date] = results[i].order_quantity;
            //                      map['product'] = results[i].product_name + ' : ' + results[i].product_unit_size;
            //                      map['product_parent_id'] = results[i].product_parent_id; 
            //                      i++;
            //                 }
            //                 else
            //                 {

            //                     break;
            //                 }
            //              }

            //         }
            //     arr_new.push(map); 







             // var date = results[i]['order_date'].toString().slice(0,10);
             //        var datek = dates[k];
             //        if(date == datek)
             //            {
             //                map['product'] = results[i].product_name + " : "+ results[i].product_unit_size;
             //                map['product_parent_id'] = results[i].product_parent_id;   
             //                map[datek] = results[i].order_quantity;
             //            }
             //        if(date != datek)
             //            {
             //                map['product'] = results[i].product_name + " : "+ results[i].product_unit_size;
             //                map['product_parent_id'] = results[i].product_parent_id;
             //                map[datek] = 0;
             //            }
             //            i++;
             //        if(results[i].product_parent_id == map['product_parent_id'])
             //            {
             //                continue;
             //            }
             //        if(results[i].product_parent_id != map['product_parent_id'])
             //            {
             //                i--;
             //                map[datek]
             //            }











              // for (var i=0; i<results.length;i++)
        // {
        //     var map = new Object();
        //     for(k=0;k<dates.length;k++)
        //     {
        //         var map = new Object();
        //         date_p = dates[k];
        //         if(i==0)
        //         {
        //             var date = results[i].order_date.toString().slice(0,10);
        //             if(date_p == date)
        //             {
        //                 map['product'] = results[i].product_name+ " : "+results[i].order_quantity ;
        //                 map['product_parent_id'] = results[i].product_parent_id;
        //                 map[date_p] = results[i].order_quantity ;
        //                 i++;

        //             }
        //             if(date_p != date)
        //             {
        //                 map['product'] = results[i].product_name+ " : "+results[i].order_quantity ;
        //                 map['product_parent_id'] = results[i].product_parent_id;
        //                 map[date_p] = 0;
        //                 i++;
        //             }
        //         }  
        //         else
        //         {
        //             var date = results[i].order_date.toString().slice(0,10);
        //             if( (date_p == date) && (results[i].product_parent_id == map['product_parent_id']) )
        //             {
        //                 map['product'] = results[i].product_name+ " : "+results[i].order_quantity ;
        //                 map['product_parent_id'] = results[i].product_parent_id;
        //                 map[date_p] = results[i].order_quantity ;
        //                 i++;
        //             }
        //             else if((date_p != date) && (results[i].product_parent_id == map['product_parent_id']))
        //             {
        //                 map['product'] = results[i].product_name+ " : "+results[i].order_quantity ;
        //                 map['product_parent_id'] = results[i].product_parent_id;
        //                 map[date_p] = 0;
        //                 i++;

        //             }
        //         }

        //     }
        // }
                    // i++;
                    // if(i>= results.length)
                    // {
                    //     break;
                    // }
                    // if( results[i]['product_parent_id'] != map['product_parent_id'] )
                    // {
                    //     i--;
                    //     break;
                    // }  
            //console.log(arr_new);
        //      var final = { dates : dates,
        //         arr_new : arr_new
        //      };

        // //console.log(arr_new);
        // res.json(final);
























//         for(var i =0;i< results.length;i++)
//         {
//             var map = new Object();
//             var k=0;
//             var flag = 0;
//             OUTER:
//             while(k < dates.length)
//             {
    
//                 datep = dates[k];
//                 if(i==0)
//                 {
//                     var dateq = results[i]['order_date'].toString().slice(0,10);
//                     if(dateq == datep)
//                     {
//                         map['product'] = results[i].product_name+ " : "+results[i].product_unit_size ;
//                         map['product_parent_id'] = results[i].product_parent_id;
//                         map[datep] = results[i].order_quantity ;
//                         i++;
//                         k++;
//                     }
//                     else
//                     {
//                         k++;
//                     }

//                 }
//                 else
//                 {
//                     if((results[i].product_parent_id != map['product_parent_id']) && (flag==0))
//                     {
//                         console.log('dsa');
//                         flag = 1;
//                         break OUTER;
//                     }
//                     if((results[i].product_parent_id != map['product_parent_id']) && (flag==1))
//                     {
//                         var dateq = results[i]['order_date'].toString().slice(0,10);
//                         if(dateq == datep)
//                         {
//                             map['product'] = results[i].product_name+ " : "+results[i].product_unit_size ;
//                             map['product_parent_id'] = results[i].product_parent_id;
//                             map[datep] = results[i].order_quantity ;
//                             i++;
//                             k++;
//                             flag = 0;
//                         }
//                         else
//                         {
//                             k++;
//                         }
//                     }
//                     if(results[i].product_parent_id == map['product_parent_id'])
//                     {
//                         var dateq = results[i]['order_date'].toString().slice(0,10);
//                         if(dateq == datep)
//                         {
//                             map['product'] = results[i].product_name+ " : "+results[i].product_unit_size ;
//                             map['product_parent_id'] = results[i].product_parent_id;
//                             map[datep] = results[i].order_quantity ;
//                             i++;
//                             k++;
//                         }
//                         else
//                         {
//                             console.log('dsad');
//                             k++;
//                         }
//                     }

                
//                 }
               
//             }
//             arr_new.push(map);
//             console.log(map);
//         }


// res.json(arr_new);







    
        // if(i==0)
        // {
        //     var date = results[i]['order_date'].toString().slice(0,10);
        //     map['product'] = results[i].product_name + " : " + results[i].product_unit_size;
        //     map['product_parent_id'] = results[i]['product_parent_id'];
        //     map[date] = results[i].product_unit_size;
        // }
        //     if(results[k].product_parent_id == map['product_parent_id'])
        //     {
        //         var date = results[k]['order_date'].toString().slice(0,10);
        //         map['product'] = results[k].product_name + " : " + results[i].product_unit_size;
        //         map['product_parent_id'] = results[k]['product_parent_id'];
        //         map[date] = results[k].product_unit_size;
        //         k++;
        //         i=k;
        //         flag = 1;
        //     }




    //     if(i==0)
    // {
    //     var date = results[i]['order_date'].toString().slice(0,10);
    //     map['product'] = results[i].product_name + " : " + results[i].product_unit_size;
    //     map['product_parent_id'] = results[i]['product_parent_id'];
    //     map[date] = results[i].order_quantity;
    // }
    // for( var k=i+1;i<results.length;k++)
    // {
    //     if((results[k].product_parent_id == z) && (flag2 == 0))
    //     {
    //         var date = results[i]['order_date'].toString().slice(0,10);
    //         map['product'] = results[i].product_name + " : " + results[k].product_unit_size;
    //         map['product_parent_id'] = results[i]['product_parent_id'];
    //         map[date] = results[i].order_quantity;
    //         z= results[i].product_parent_id ;
    //         i = k;
    //         flag2=1;
    //     }
    //     else if((results[k].product_parent_id == z) && (flag2 ==1))
    //     {
    //         var date = results[k]['order_date'].toString().slice(0,10);
    //         map['product'] = results[k].product_name + " : " + results[k].product_unit_size;
    //         map['product_parent_id'] = results[k]['product_parent_id'];
    //         map[date] = results[k].order_quantity;
    //         z= results[k].product_parent_id ;
    //         i = k;
    //         flag=0;
    //     }
    //     else if((results[k].product_parent_id != z) && (flag==1))
    //     {
    //         var date = results[i]['order_date'].toString().slice(0,10);
    //         map['product'] = results[i].product_name + " : " + results[i].product_unit_size;
    //         map['product_parent_id'] = results[i]['product_parent_id'];
    //         map[date] = results[i].order_quantity;
    //     }
    //     else
    //         continue;
    // }
