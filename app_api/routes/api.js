require('./db');
var express = require('express');
var router = express.Router();


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
        console.log(total_count);
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
        console.log(total_count);
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
        console.log(total_count);
        var map = new Object();
        map[key1] = 'TOTAL';
        map[key2] = total_count;
        map[key3] = total_cost;
        arr.push(map);
        res.json(arr);
    });
});

router.get('/download_reports7', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as download_count FROM user u LEFT JOIN building b ON u.building = b.id  WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 7 DAY) GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].building_name;
            map[key2] = results[i].download_count;
            arr.push(map);
        }
        res.json(arr);
    });
});

router.get('/download_reports15', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as download_count FROM user u LEFT JOIN building b ON u.building = b.id  WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 15 DAY) GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].building_name;
            map[key2] = results[i].download_count;
            arr.push(map);
        }
        res.json(arr);
    });
});

router.get('/download_reports30', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as download_count FROM user u LEFT JOIN building b ON u.building = b.id  WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 30 DAY) GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].building_name;
            map[key2] = results[i].download_count;
            arr.push(map);
        }
        res.json(arr);
    });
});


router.get('/subscription_reports7', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as subscription_count FROM user u JOIN building b ON u.building = b.id JOIN billing_master bm ON u.billing_master_id  = bm.id WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 7 DAY) AND bm.amount < 0 GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].building_name;
            map[key2] = results[i].subscription_count;
            arr.push(map);
        }
        res.json(arr);
    });
});

router.get('/subscription_reports15', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as subscription_count FROM user u JOIN building b ON u.building = b.id JOIN billing_master bm ON u.billing_master_id  = bm.id WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 15 DAY) AND bm.amount < 0 GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].building_name;
            map[key2] = results[i].subscription_count;
            arr.push(map);
        }
        res.json(arr);
    });
});

router.get('/subscription_reports30', function (req, res, next) {
        
client.query("SELECT b.building_name, COUNT(*) as subscription_count FROM user u JOIN building b ON u.building = b.id JOIN billing_master bm ON u.billing_master_id  = bm.id WHERE u.created_at > DATE_SUB(CURDATE(),INTERVAL 30 DAY) AND bm.amount < 0 GROUP BY b.building_name;" , function(err, results) {
        if (err)
        {
            throw err;
        }

        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';
        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].building_name;
            map[key2] = results[i].subscription_count;
            arr.push(map);
        }
        res.json(arr);
    });
});
router.get('*', function (req, res, next) {
        res.send('DailyNinja');
});
module.exports = router ;