/**
 * Donation API Controller
 */

require('rootpath')();
const msg = require('assets/i18n/en');
const User = require("backend/models/user");
const Cause = require("backend/models/cause");
const Donation = require("backend/models/donation");
const StripeHelper = require("backend/utils/StripeHelper");
const uuid = require('uuid/v1');

module.exports.giveDonation = function(req, res){
    const params = req.body.params;
    const causeIds = params.causeIds,
          userId = params.userId;
    var amount = parseFloat(params.amount||0);
    var resJSON = {
        msg:msg.FAIL
    };
    if (!userId || userId.length==0 || amount==0 || causeIds.length==0){
        res.send(resJSON);
        return;
    }
    
    User.find({id:userId}, function(err, users){
        if (err){
            console.log(err);
            res.send(resJSON);
        }else{
            const user = users[0];
            if (user && user.paymentInfo&& user.paymentInfo.cusid){
                const cusid = user.paymentInfo.cusid;
                var curDate = new Date().toDateString();
                chargeForDonation(cusid,amount, curDate, function(err, charge){
                    if (!err && charge){
                        amount = amount/causeIds.length;
                        donationProcessByCauses(causeIds, userId, amount);
                        var causeIdsStr = user.causeIdsForDonation&&user.causeIdsForDonation.length>0?user.causeIdsForDonation.join(","):"";
                        causeIds.forEach(function(item){
                            if(causeIdsStr.indexOf(item)<0) user.causeIdsForDonation.push(item);
                        });
                        user.lastPaid_at = new Date();
                        user.save();
                    }
                });
                resJSON.msg = msg.SUCCESS;
            }
            res.send(resJSON);
        }
    });
}

function donationProcessByCauses(causeIds, userId,  amount){
    causeIds.forEach(causeId => {
        if (causeId.length>0){
            Cause.find({id:causeId}, function(err, docs){
                if (err){
                    console.log(err);
                }else{
                    var doc = docs[0];
                    if (doc && doc.status=="approve"){
                        const donId = uuid();
                        var don = new Donation({
                            id:donId,
                            giverId:userId,
                            causeId:causeId,
                            amount:amount
                        });
                        don.save();
                        doc.donationIds.push(donId);
                        doc.save();
                    }
                }
            });
        }
    });
}

function chargeForDonation(cusid, amount, charityName, cb){
    StripeHelper.createCharge(cusid, amount, "Donation for " + charityName, cb);
}


module.exports.getDonationsSumByUserID = function(req, res){
    const userId = req.body.params.userId;
    let causeIds = "", causesArr = [];
    var resJSON = {
        msg:msg.FAIL,
        sum:0,
        cn:0
    };
    let sum = 0,
        cn = 0;
    if (!userId)
        res.send(resJSON);
    else{
        Donation.find({giverId:userId}, function(err, docs){
            if (err){
                console.log(err);
                res.send(resJSON);
            }else{
                docs.forEach((doc)=>{
                    if (causeIds.indexOf(doc.causeId)<0){
                        cn++;
                        causeIds += doc.causeId + ",";
                        causesArr.push(doc.causeId);
                    }
                    sum += doc.amount;
                });
                resJSON.msg = msg.SUCCESS;
                resJSON.sum = sum;
                resJSON.cn = cn;
                getCausesList(causesArr, function(causes){
                    resJSON.causes = causes;
                    res.send(resJSON);
                });
            }
            
        }).sort({"created_at":-1});
    }
    function getCausesList(arr, cb){
        if (arr.length==0) {
            cb([]);
            return;
        };
        Cause.find({id:{$in:arr}}, function(err, docs){
            if(err){
                cb([]);
            }else{
                cb(docs);
            }
        }).limit(10);
    }
}

