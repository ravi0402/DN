var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/order', function(req, res, next) {
    client.query("select do.order_date, pm.product_name, COUNT(do.order_id) from daily_orders do join product_master pm on do.product_master = pm.id where do.status = 'NOT_FOUND' and do.order_date > DATE_SUB(CURDATE(),interval 7 day) group by do.order_date, pm.product_name " , function(err, results){
        if (err) {
            throw err;
        }
        console.log(results);
        var keyy = Object.keys(results[0]);
        console.log(keyy);
        res.render('index', {
            title: 'DailyNinja',
            keyy : keyy,
            results: results
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


router.get('/products', function(req, res, next) {
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
