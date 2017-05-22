var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products', function(req, res, next) {
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

router.get('/products7', function(req, res, next) {
    client.query("select do.order_date, pm.product_name, COUNT(do.order_id) as order_count from daily_orders do join product_master pm on do.product_master = pm.id where do.status = 'NOT_FOUND' and do.order_date > DATE_SUB(CURDATE(),interval 7 day) group by do.order_date, pm.product_name " , function(err, results) {
        if (err) {
            throw err;
        }
        var keyy = Object.keys(results[0]);

        var obj2 = new Object();

        var arr = [];
        var final_arr = [];
        var dates = [];
        var key1 = 'coll';
        var key2 = 'roww';
        var count = [];
        for (var i=0; i<results.length; i++)
        {

            var map = new Object();
            map[key1] = results[i].order_date.toString().slice(4,15);
            map[key2] = results[i].product_name + ',' + results[i].order_count ;
            arr.push(map);
        }

        for(var i=0,k=0;i<arr.length;i++)
        {
            for (var j = i + 1; j < arr.length; j++)
            {

                if (arr[i][key2].slice(0, -2) == arr[j][key2].slice(0, -2))
                {
                    count[k] =
                    final_arr[k] = arr[j][key2].slice(0, -2);
                }

            }
        }
            // if(i==0)
            // {
            //     arr_new[j] = arr[i];
            //
            // }
            //
            // else
            // {
            //
            //     if (arr[i][key2].slice(0,-2) == arr_new[j][key2].slice(0,-2) )
            //     {
            //
            //         count[j] = parseInt(arr_new[j][key2].slice(-1)) + parseInt(arr[i][key2].slice(-1)) ;
            //     }
            //     else
            //     {
            //         j++;
            //         arr_new[j] = arr[i];
            //     }

        console.log(count);


        var dates = [];
        var product_count = [];

        for(var i = 0;i<arr_new.length ;i++)
        {
            dates.push(arr_new[i][key1]);

        }


        //console.log(product);

        res.render('index', {
            title: 'Product Count (last 7 days)',
            keyy : dates,
            results: product_count
        });
    });
});

router.get('/vendor', function(req, res, next) {
    client.query('SELECT name FROM vendor WHERE allow_cash_collection = 1', function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        var keyy = Object.keys(results[0]);
        //console.log(keyy);
        res.render('index', {
            title: 'DailyNinja',
            keyy : keyy,
            results: results
        });
    });
});


router.get('/order', function(req, res, next) {
    client.query("SELECT COUNT(user_name), COUNT(billing_master.amount), building.building_name FROM `user` INNER JOIN building ON user.building=building.id INNER JOIN billing_master ON user.billing_master_id = billing_master.id GROUP BY building HAVING COUNT(user_name) > 100 AND COUNT(billing_master.amount) > 0 ", function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        var keyy = Object.keys(results[0]);
        //console.log(keyy);
        res.render('index', {
            title: 'DailyNinja',
            keyy : keyy,
            results: results
        });
    });
});



module.exports = router;
