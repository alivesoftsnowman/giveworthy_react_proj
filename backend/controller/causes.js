/**
 * Cause API Controller
 */

require('rootpath')();
const msg = require('assets/i18n/en');
const User = require("backend/models/user");
const Cause = require("backend/models/cause");
const LogHistory = require("backend/models/loghistory");
const uuid = require('uuid/v1');

module.exports.getCauseStatus = function(req, res){
    var params = req.body.params,
        causeId = params.causeId;
    var resJSON = {
        msg:msg.FAIL
    };
    Cause.find({id:causeId}, function(err, docs){
        if (err){
            console.log(err);
        }else{
            if (docs&&docs.length>0){
                resJSON.msg = msg.SUCCESS;
                resJSON.status = docs[0].status;
            }
        }
        res.send(resJSON);
    })
}
/**
 * @description get all the list of causes by user id
 */

module.exports.getCause = function(req, res){
    var params = req.body.params,
        id = params.id
    
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    if (!id || id==""){
        resJSON.desc=msg.UNKNOWN_USER;
        res.send(resJSON);
    }else{
        Cause.find({ownerId:id}, function(err, docs){
            if (err){
                console.log(err);
                resJSON.desc=msg.DB_ERROR;
            }else{
                resJSON.msg = msg.SUCCESS;
                resJSON.causes = docs||[];
            }
            res.send(resJSON);
        })
    }
    
}
/**
 * @description get the list of causes for acception
 */

module.exports.getCausesForAcception = function(req, res){
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    // Cause.find({$or:[{status:'init'},{status:'reviewing'},{status:{$eq:null}}]}, function(err, docs){
    //     if (err){
    //         console.log(err);
    //         resJSON.desc=msg.DB_ERROR;
    //     }else{
    //         resJSON.msg = msg.SUCCESS;
    //         resJSON.causes = docs||[];
    //     }
    //     res.send(resJSON);
    // }).sort({"created_at":-1,"updated_at":-1}).limit(20);
    Cause.find({},function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.causes = docs||[];
        }
        res.send(resJSON);
    }).sort({"created_at":-1});
}

/**
 * @description get the matched causes
 */

module.exports.getMatchedCauses = function(req, res){
    var params = req.body.params,
        userId = params.userId,
        limit = params.limit || 5,
        start = params.start || 0;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    if (!userId) {
        res.send(resJSON);
        return;
    }
    Cause.find({status:"approve"}, function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
            res.send(resJSON);
        }else{
            resJSON.msg = msg.SUCCESS;
            if(start>=docs.length){
                resJSON.causes = [];
                res.send(resJSON);
            }else{
                sortByLoi(docs||[], function(sortedItems){
                    resJSON.causes = sortedItems;
                    res.send(resJSON);
                });
            }
            
        }
    });
    function sortByLoi(items, cb){
        User.find({id:userId}, function(err, docs){
            if (err||!docs||docs.length==0){
                console.log(err);
                cb([]);
            }else{
                const userLoi = docs[0].loi;
                //get score for matching
                items.forEach(function(item){
                    var tags = item.tags;
                    item.score = item.donationIds?item.donationIds.length:0;
                    tags.forEach(function(tag){
                        item.score += userLoi[tag]?userLoi[tag]:0;
                    });
                });
                //sort cause array
                items.sort((a,b)=>a.score < b.score ? 1 : a.score > b.score ? -1 : 0);
                cb(items.slice(start,start+limit>=items.length?items.length:start+limit));
            }
        });
    };
}

/**
 * @description get causes list by tags
 */
module.exports.getCausesByTags = function(req, res){
    var params = req.body.params,
        limit = params.limit || 24;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    var query = {status:"approve"};
    if (params.filter!='all'){
        query['tags'] = {
            $in:[params.filter]
        }
    }
    Cause.find(query, function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.causes = docs||[];
        }
        res.send(resJSON);
    }).limit(limit);
}

module.exports.getCausesByOwnerId = function(req, res){
    var params = req.body.params,
        ownerId = params.ownerId ;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    var query = {ownerId:ownerId};
    Cause.find(query, function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.causes = docs.map((doc)=>{
                return {
                    id:doc.id,
                    name:doc.name,
                    status:doc.status,
                    created_at:doc.created_at
                }
            })
        }
        res.send(resJSON);
    });
}

module.exports.deleteCauses = function(req, res){
    var causeIds = req.body.params.causeIds;
    var resJSON = {
        msg:msg.FAIL
    };
    if (!causeIds)
        res.send(resJSON);
    else{
        var count = 0;
        causeIds.forEach((causeId=>{
            Cause.find({'id':causeId}, function(err, docs){
                if (err){
                    console.log(err);
                }else{
                    const doc = docs[0];
                    if (doc){
                        doc.remove();
                        if ( doc.financialDocLink && doc.financialDocLink.length>0){
                            var path = __dirname + "/../.." ;
                            var financialDocFilePath = path + doc.financialDocLink.replace(process.env.HOST,"");
                            if (fs.existsSync(financialDocFilePath))
                                fs.unlinkSync(financialDocFilePath);
                        }
                    }
                }
                if (count == causeIds.length-1){
                    resJSON.msg = msg.SUCCESS;
                    res.send(resJSON);
                }else{
                    count++;
                }
            });
        }));
        
    }
}


module.exports.getCauseById = function(req, res){
    var params = req.body.params,
        id = params.id ;
    var resJSON = {
        msg:msg.FAIL,
        desc:""
    };
    var query = {id:id};
    Cause.find(query, function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
        }else{
            if (docs[0]){
                resJSON.msg = msg.SUCCESS;
                resJSON.cause = docs[0];
            }
        }
        res.send(resJSON);
    });
}

module.exports.updatePostInfoForCause = function(req, res){
    var params = req.body.params,
        userId = params.userId,
        causeId = params.causeId,
        postType = params.postType,
        content = params.content;
    var resJSON = {
        msg:msg.FAIL,
        desc:""
    };
    if (!userId || !causeId|| !postType ||!content){
        res.send(resJSON); 
        return;
    }
    var lh = new LogHistory({
        id:uuid(),
        userId:userId,
        causeId:causeId,
        postType:postType,
        content:content
    });
    lh.save();
    resJSON.msg = msg.SUCCESS;
    res.send(resJSON);
}

module.exports.getPostInfoForCause = function(req, res){
    var resJSON = {
        msg:msg.FAIL,
        desc:""
    };
    LogHistory.find({},function(err, docs){
        if(err){
            console.log(err)
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.items = [];
            var cn = 0;
            docs.forEach(function(doc){
                Cause.find({id:doc.causeId}, function(err, causes){
                    if (err){
                        console.log(err);
                    }else{
                        const cause = causes[0];
                        if (cause){
                            resJSON.items.push({
                                name: cause.name || "Charity Name",
                                content:doc.content,
                                imageURL:null
                            });
                        }
                    }
                    cn++;
                    if (cn==docs.length){
                        res.send(resJSON);
                    }
                })
            });
            
        }
    }).sort({created_at:-1}).limit(5);
}