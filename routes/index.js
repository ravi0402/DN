var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});

router.get('/products4', function(req, res, next) {
    client.query("select do.order_date, pm.product_name, COUNT(do.order_id) as order_count from daily_orders do join product_master pm on do.product_master = pm.id where do.status = 'NOT_FOUND' and do.order_date > DATE_SUB(CURDATE(),interval 4 day) group by do.order_date, pm.product_name " , function(err, results) {
        if (err)
        {
            throw err;
        }
        var keyy = Object.keys(results[0]);

        var obj2 = new Object();


        var arr = [];
        var arr_new = [];
        var key1 = 'coll';
        var key2 = 'roww';
        for (var i=0; i<results.length; i++)
        {

            var map = new Object();
            map[key1] = results[i].order_date.toString().slice(4,15);
            map[key2] = results[i].product_name + '=' + results[i].order_count ;
            arr.push(map);
        }



        for(var i=0,j=0;i<arr.length;i++)
        {

            if(i==0)
            {
                arr_new[j] = arr[i];

            }

            else
            {
                if (arr[i][key1] == arr_new[j][key1] )
                {
                    arr_new[j][key2] = arr_new[j][key2]+  "," + arr[i][key2] ;
                }
                else
                {
                    j++;
                    arr_new[j] = arr[i];
                }
            }
        }

        var dates = [];
        var product_count = [];

        for(var i = 0;i<arr_new.length ;i++)
        {
            dates.push(arr_new[i][key1]);
            product_count.push(arr_new[i][key2]);
        }

        var resultt = [];
        var tmp;
        // change your , into break tags
        for (var line in product_count) {
            resultt.push(product_count[line].replace(/,/g,'<br />'));
        }

        console.log(resultt);



        res.render('index', {
            title: 'Products Not Found(last 4 days)',
            keyy : dates,
            results: resultt
        });
    });
});





router.get('/products30', function(req, res, next) {
    client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 30 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err) {
            throw err;
        }
        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';

        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            arr.push(map);
        }
        res.render('index2', {
            title: 'Product Count (last 30 days)',
            results: arr
        });
    });
});


router.get('/products7', function(req, res, next) {
    client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 7 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err) {
            throw err;
        }
        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';

        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            arr.push(map);
        }
        res.render('index2', {
            title: 'Product Count (last 7 days)',
            results: arr
        });
    });
});


router.get('/products', function(req, res, next) {
    client.query("SELECT pm.product_name, COUNT(do.order_id) AS order_count FROM daily_orders do JOIN product_master pm ON do.product_master = pm.id WHERE do.status = 'NOT_FOUND' AND do.order_date > DATE_SUB(CURDATE(),INTERVAL 1 DAY) GROUP BY pm.product_name ORDER BY order_count DESC" , function(err, results) {
        if (err) {
            throw err;
        }
        var keyy = Object.keys(results[0]);
        var arr = [];
        var key1 = 'coll';
        var key2 = 'roww';

        for (var i=0; i<results.length; i++)
        {
            var map = new Object();
            map[key1] = results[i].product_name;
            map[key2] = results[i].order_count;
            arr.push(map);
        }
        res.render('index2', {
            title: 'Product Count(Yesterday)',
            results: arr
        });
    });
});



module.exports = router;
