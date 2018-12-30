require('rootpath')();
const User = require("backend/models/user");
const Cause = require("backend/models/cause");
const Donation = require("backend/models/donation");
const StripeHelper = require("backend/utils/StripeHelper");
const uuid = require('uuid/v1');

const CronJob = require('cron').CronJob;
const moment = require("moment");
const bilingCycle = 30;
const job = new CronJob({
    cronTime:'0 0 * * *', // Daily Cron Check @ 00:00
    onTick:function(){
        giveDonation();
    },
    start:false
})
function giveDonation(){
    User.find({type:"giver"}, function(err, docs){
        if (!err && docs && docs.length>0){
            docs.forEach(user => {
                if(user.causeIdsForDonation && user.causeIdsForDonation.length>0){
                    if (user.paymentInfo&& user.paymentInfo.cusid){ 
                        var now =moment(), startDate = moment(user.lastPaid_at);
                        var diffDays = now.diff(startDate, "days");
                        if (diffDays==bilingCycle){
                            const cusid = user.paymentInfo.cusid;
                            var curDate = new Date().toDateString();
                            chargeForDonation(cusid,user.donationAmount, curDate, function(err, charge){
                                const amount = user.donationAmount/user.causeIdsForDonation.length;
                                user.causeIdsForDonation.forEach(causeId=>{
                                    Cause.find({id:causeId}, function(err, Causes){
                                        if (err){
                                            console.log(err);
                                        }else{
                                            var doc = Causes[0];
                                            if (doc && doc.status=="approve"){
                                                const donId = uuid();
                                                var don = new Donation({
                                                    id:donId,
                                                    giverId:user.id,
                                                    causeId:causeId,
                                                    amount:amount
                                                });
                                                don.save();
                                                doc.donationIds.push(donId);
                                                doc.save();
                                            }
                                        }
                                    });  
                                });
                                user.lastPaid_at = new Date();
                                user.save();
                            });
                        }
                    }
                }     
            });
        }
    });
}

function chargeForDonation(cusid, amount, desc, cb){
    StripeHelper.createCharge(cusid, amount, "Donation for " + desc, cb);
}
job.start();