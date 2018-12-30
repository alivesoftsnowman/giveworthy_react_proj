var stripe = require("stripe")(process.env.STRIPE_TEST_SEC_KEY);
require('rootpath')();

module.exports.createCustomer = function(params, cb){
    stripe.customers.create(params, function(err, customer) {
        cb(err, customer);            
    });
}

module.exports.updateCustomer = function(cusid, params, cb){
    stripe.customers.update(cusid, params, function(err, customer) {
        cb(err, customer);            
    });
};

module.exports.createCharge = function(cusid, amount, desc,  cb){
    stripe.charges.create({
        amount: amount*100,
        currency: "usd",
        customer:cusid,
        description:desc
    }, function(err, charge) {
    // asynchronously called
       cb&&cb(err, charge);
    });
}

module.exports.deleteCustomer = function(cusid, cb){
    stripe.customers.del(
        cusid,
        function(err, confirmation) {
          // asynchronously called
          cb&&cb(err,confirmation);
        }
    );
}