require('./db');
var express = require('express');
var router = express.Router();


router.post('/datepick', function (req, res, next) {
    var date_new = req.body.json;
    client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date= '"+ date_new +"' GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        var key3 = 'roww1';
        var total_cost = 0;
        var total_count = 0;
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            map[key3] = results[i].cost;
            total_count += parseInt((results[i].order_count).toString());
            total_cost += parseInt(results[i].cost);
            arr.push(map);
        }
 
        var map = new Object();
        map[key1] = 'TOTAL';
        map[key2] = total_count;
        map[key3] = total_cost;
        arr.push(map);
        res.json(arr);
    });
        
});




router.get('/products1', function (req, res, next) {
        
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 1 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        var key3 = 'roww1';
        var total_cost = 0;
        var total_count = 0;
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            map[key3] = results[i].cost;
            total_count += parseInt((results[i].order_count).toString());
            total_cost += parseInt(results[i].cost);
            arr.push(map);
        }
        var map = new Object();
        map[key1] = 'TOTAL';
        map[key2] = total_count;
        map[key3] = total_cost;
        arr.push(map);
        res.json(arr);
    });
});

router.get('/products7', function (req, res, next) {
        
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 7 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        var key3 = 'roww1';
        var total_cost = 0;
        var total_count = 0;
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            map[key3] = results[i].cost;
            total_count += parseInt((results[i].order_count).toString());
            total_cost += parseInt(results[i].cost);
            arr.push(map);
        }

        var map = new Object();
        map[key1] = 'TOTAL';
        map[key2] = total_count;
        map[key3] = total_cost;
        arr.push(map);
        res.json(arr);
    });
});
router.get('/products30', function (req, res, next) {
        
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 30 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        var key3 = 'roww1';
        var total_cost = 0;
        var total_count = 0;
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            map[key3] = results[i].cost;
            total_count += parseInt((results[i].order_count).toString());
            total_cost += parseInt(results[i].cost);
            arr.push(map);
        }

        var map = new Object();
        map[key1] = 'TOTAL';
        map[key2] = total_count;
        map[key3] = total_cost;
        arr.push(map);
        res.json(arr);
    });
});

router.post('/drangeProducts', function (req, res, next) {
    var startDate = req.body.startDate ; 
    var endDate = req.body.endDate ;     
    console.log(startDate);
    console.log(endDate);
client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count, do.product_unit_cost*COUNT(do.order_id) AS cost FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date >'"+ startDate +"' and do.order_date < '"+endDate+"' GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err)
        {
            throw err;
        }
        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        var key3 = 'roww1';
        var total_cost = 0;
        var total_count = 0;
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            map[key3] = results[i].cost;
            total_count += parseInt((results[i].order_count).toString());
            total_cost += parseInt(results[i].cost);
            arr.push(map);
        }

        var map = new Object();
        map[key1] = 'TOTAL';
        map[key2] = total_count;
        map[key3] = total_cost;
        arr.push(map);
        res.json(arr);
    });
});






router.get('/townessCurrentInventory', function (req, res, next) {
        
client.query("SELECT pp.id AS dn_id , pp.external_system_id AS towness_id, pp.product_name, pp.product_unit_price, inv.quantity, inv.last_sync_quantity, pp.min_order_size, pp.dn_order_size FROM product_parent pp JOIN inventory inv ON inv.product_parent_id = pp.id WHERE pp.external_supplier_id = 5 AND pp.status = 1 AND pp.product_category IS NOT NULL ORDER BY product_name ASC" , function(err, results) {
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
    console.log(startDate);
    console.log(endDate);
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



router.get('*', function (req, res, next) {
        res.send('Error 404!!!');
});
router.post('*', function (req, res, next) {
        res.send('Error 404!!!');
});
module.exports = router ;