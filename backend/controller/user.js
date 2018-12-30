/**
 * User API Controller
 */

/**
 * @description 
 * the API to user login and signup, profile setting etc
 */

require('rootpath')();
const jwt = require('jsonwebtoken');
const msg = require('assets/i18n/en');
const uuid = require('uuid/v1');
const User = require("backend/models/user");
const Cause = require("backend/models/cause");
const LogHistory = require("backend/models/loghistory");
const secertKey = process.env.SECRET_KEY;
const StripeHelper = require("backend/utils/StripeHelper");
const fs = require("fs");
/**
 * login controller
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.login = function(req, res){
    var params = req.body.params,
        email = params.email,
        token = params.token;
    const user = jwt.verify(token, secertKey);
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        access_token:"",
        newUser:0
    };
    if (!user || user.email!= email){
        resJSON.desc=msg.TOKEN_ERROR;
        res.send(resJSON);
    }else{
        
        loginProcess();
    }
    function loginProcess(){

        User.find({email:user.email}, function(err, docs){
            if (err){
                console.log(err);
                resJSON.desc=msg.TOKEN_ERROR;
                res.send(resJSON);
            }else{
                if (!docs || docs.length==0){
                    if (user.googleID || user.facebookID){
                        user.id = uuid();
                        var newUser = new User(user);
                        newUser.save(function(err, savedDoc){
                            resJSON.msg = msg.SUCCESS;
                            resJSON.newUser = 1;
                            resJSON.access_token = jwt.sign(JSON.stringify(savedDoc), secertKey);
                            res.send(resJSON);
                        });
                    }else{
                        resJSON.desc = msg.AUTH_ERROR;
                        res.send(resJSON);
                    }
                }else{
                    var doc = docs[0];
                    if (user.googleID || user.facebookID){
                        doc.googleID = user.googleID;
                        doc.facebookID = user.facebookID;
                        doc.save();
                        resJSON.msg = msg.SUCCESS;
                        resJSON.access_token = jwt.sign(JSON.stringify(doc), secertKey);
                        res.send(resJSON);
                    }else{
                        doc.comparePassword(user.password, function(errMatch, isMatched){
                            if (!errMatch && isMatched){
                                resJSON.msg = msg.SUCCESS;
                                resJSON.access_token = jwt.sign(JSON.stringify(doc), secertKey);
                            }else{
                                resJSON.desc = msg.AUTH_ERROR;
                            }
                            res.send(resJSON);
                        });
                    }
                }
            }
        });
    }
}

module.exports.signup = function(req, res){
    var params = req.body.params,
        email = params.email,
        token = params.token;
    const user = jwt.verify(token, secertKey);
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        access_token:""
    };
    if (!user || user.email!= email){
        resJSON.desc=msg.TOKEN_ERROR;
        res.send(resJSON);
    }else{
        signupProcess();
    }
    function signupProcess(){
        User.find({email:user.email}, function(err, docs){
            if (err){
                console.log(err);
                resJSON.desc=msg.TOKEN_ERROR;
                res.send(resJSON);
            }else{
                if (!docs || docs.length==0){
                    user.id = uuid();
                    user.created_at = new Date();
                    var newUser = new User(user);
                    newUser.save(function(err, savedDoc){
                        resJSON.msg = msg.SUCCESS;
                        resJSON.access_token = jwt.sign(JSON.stringify(savedDoc), secertKey);
                        res.send(resJSON);
                    });
                }else{
                    resJSON.desc = msg.DUPLICATED_USER;
                    res.send(resJSON);
                }
            }
        });
    }
}
module.exports.saveUserInfo = function(req, res){
    var params = req.body.params,
        token = params.token;
    const user = jwt.verify(token, secertKey);
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
    };
    if (!user || !user.id || user.id==""){
        resJSON.desc = msg.UNKNOWN_USER;
        res.send(resJSON);
    }else{
        User.find({"id":user.id}, function(err, docs){
            if (err||!docs||docs.length==0){
                resJSON.desc = msg.UNKNOWN_USER;
                res.send(resJSON);
            }else{
                let doc = docs[0];
                let stripeToken = undefined;
                Object.keys(user).forEach(function(key){
                    if (key=="paymentInfo") {
                        Object.keys(user.paymentInfo).forEach(function(pkey){
                            if (pkey=="stripeToken")
                                stripeToken = user.paymentInfo.stripeToken;
                            else
                                doc.paymentInfo[pkey]  = user.paymentInfo[pkey];
                        });
                    }else{
                        doc[key] = user[key];  
                    }
                });
                
                if (stripeToken) {
                    const params = {
                        email: doc.email,
                        source: stripeToken
                    };
                    var cb = function(err, customer) {
                        if (err) {
                            resJSON.msg = err.message;//msg.SUCCESS;
                        }
                        else {
                            doc.paymentInfo.cusid = customer.id;                            
                            doc.save();
                            resJSON.msg = msg.SUCCESS;
                        }   
                        res.send(resJSON);                  
                    };
                    if (doc.paymentInfo.cusid)
                        StripeHelper.updateCustomer( doc.paymentInfo.cusid, params, cb);
                    else
                        StripeHelper.createCustomer(params, cb);
                } else {
                    doc.save();
                    resJSON.msg = msg.SUCCESS;
                    res.send(resJSON);
                }                
            }
            
        });
    }
}

module.exports.saveCause = function(req, res){
    var params = req.body.params,
        id = params.id;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        id:""
    };
    if (!id){
        if (params.ownerId){
            User.find({id:params.ownerId}, function(err, docs){
                if(err){
                    resJSON.desc=msg.DB_ERROR;
                    res.send(resJSON);
                }else{
                    if (docs&&docs.length>0){
                        var user = docs[0];
                        user.type="charity";
                        user.save();
                        params.id = uuid();
                        params.created_at = new Date();
                        params.status = 'init';
                        var cause = new Cause(params);
                        cause.save(function(err1, savedDoc){
                            if (err1){
                                console.log(err1);
                                resJSON.desc=msg.DB_ERROR;
                            }else{
                                resJSON.newCause = 1;
                                resJSON.id = savedDoc.id;
                                resJSON.msg = msg.SUCCESS;
                            }
                            res.send(resJSON);
                        });
                    }else{
                        resJSON.desc = msg.UNKNOWN_USER;
                        res.send(resJSON);
                    }
                }
            });
        }else{
            resJSON.desc = msg.UNKNOWN_USER;
            res.send(resJSON);
        }
    }else{
        Cause.find({id:id}, function(err, docs){
            if (err){
                resJSON.desc=msg.DB_ERROR;
            }else{
                if (docs&&docs.length>0){
                    var doc = docs[0];
                    resJSON.msg = msg.SUCCESS;
                    if (doc.financialDocLink&&doc.financialDocLink.length>0){
                        var path = __dirname + "/../.." ;
                        var financialDocFilePath = path + doc.financialDocLink.replace(process.env.HOST,"");
                        if (fs.existsSync(financialDocFilePath))
                            fs.unlinkSync(financialDocFilePath);
                    }
                    if(doc.status=="approve"&&params.primaryVideoLink&&params.primaryVideoLink.trim().length>0&&params.primaryVideoLink!=doc.primaryVideoLink){
                        const postLog = new LogHistory({
                            id:uuid(),
                            userId:doc.ownerId,
                            causeId:doc.id,
                            postType:"video",
                            content:(doc.name||"CharityName") + " Just posted a video"
                        });
                        postLog.save();
                    }
                    if(doc.status=="approve"&&params.photoLinks&&params.photoLinks.length>0&&(!params.photoLinks.equals(doc.photoLinks))){
                        const postLog = new LogHistory({
                            id:uuid(),
                            userId:doc.ownerId,
                            causeId:doc.id,
                            postType:"photo",
                            content:(doc.name||"CharityName") + " Just " + (doc.photoLinks.length==0?"created a num album":"updated his album")
                        });
                        postLog.save();
                    }
                    Object.keys(params).forEach(function(key){
                        doc[key] = params[key];
                    });
                    if (doc.status != "approve" && params.financialDocLink&&params.financialDocLink.length>0){
                        doc.status = "reviewing";
                    };
                    resJSON.status = doc.status;
                    
                    doc.save(function(err, savedDoc){
                        if(err)
                            console.log(err);
                    });
                }else{
                    resJSON.desc = msg.UNKNOWN_CAUSE;
                }
            }
            res.send(resJSON);
        });
    }

}

module.exports.getAllUsers = function(req, res){
    var resJSON = {
        msg:msg.FAIL,
        users:[]
    };
    User.find({type:{$ne:'admin'}}, function(err, docs){
        if(err){
            console.log(err);
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.users = docs.map((item)=>{
                return {
                    id:item.id,
                    name:item.fullName || item.givenName || item.familyName,
                    email:item.email,
                    type:item.type,
                    lastPaid_at:item.lastPaid_at,
                    created_at:item.created_at
                };
            })
        };
        res.send(resJSON);
    });
}

module.exports.deleteUsers = function(req, res){
    var userIds = req.body.params.userIds;
    var resJSON = {
        msg:msg.FAIL
    };
    if (!userIds)
        res.send(resJSON);
    else{
        var count = 0;
        userIds.forEach((userid=>{
            User.find({'id':userid}, function(err, docs){
                if (err){
                    console.log(err);
                }else{
                    const doc = docs[0];
                    if (doc){
                        doc.remove();
                        //delete causes by this id if type is charity
                        if (doc.type=="charity"){
                            deleteCauseRelatedWithUser(doc.id);
                        }
                        // delete payment info if type is giver
                        if (doc.type=="giver" && doc.paymentInfo && doc.paymentInfo.cusid){
                            StripeHelper.deleteCustomer(doc.paymentInfo.cusid);
                        }
                        
                    }
                }
                if (count == userIds.length-1){
                    resJSON.msg = msg.SUCCESS;
                    res.send(resJSON);
                }else{
                    count++;
                }
            });
        }));
        
    }
    function deleteCauseRelatedWithUser(ownerId){
        Cause.find({ownerId:ownerId}, function(err, docs){
            if (!err){
                docs.forEach(function(item){
                    if ( item.financialDocLink && item.financialDocLink.length>0){
                        var path = __dirname + "/../.." ;
                        var financialDocFilePath = path + item.financialDocLink.replace(process.env.HOST,"");
                        if (fs.existsSync(financialDocFilePath))
                            fs.unlinkSync(financialDocFilePath);
                    }
                    item.remove();
                });
            }
        });
    }
}
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }else if(this[i] instanceof Object && array[i] instanceof Object){
            var b = true, self = this; 
            Object.keys(this[i]).forEach(function(key){
                if(self[i][key]!=array[i][key]) b=false;
            });
            return b;
        }else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});