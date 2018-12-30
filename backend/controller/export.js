/**
 * export coltroller
 */

require('rootpath')();
//const User = require("backend/models/user");
const path = require("path");
const fs = require("fs");
const msg = require('assets/i18n/en');
const excel = require('node-excel-export');
const User = require("backend/models/user");
const Cause = require("backend/models/cause");
const Donation = require("backend/models/donation");
const moment = require("moment");
module.exports.exportReport = function(req, res){
    const type = req.query.type||"",
         id = req.query.id ||"";
    
    if(type==""|| id==""){
        res.send("Not found");
        return;
    }
    getModel(type, id, function(specification, dataset){
        const report = excel.buildExport([ {
            name : 'Report', // <- Specify sheet name (optional)
            specification : specification, // <- Report specification
            data : dataset
        } ]);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename="
                + "Report.xlsx");
        res.send(report);
    });
   
}

function getModel(type, id, cb){
    const styles = {
		headerDark : {
			fill : {
				fgColor : {
					rgb : '00dbc5'
				}
			}
		}
	};
    switch(type){
        case "donation": 
            exportGiverDonation(styles, id, cb);
            break;
        default :
            break;
    }
}
function exportGiverDonation(styles, id, cb){
    const specification = {
        no : {
            displayName : 'No',
            headerStyle : styles.headerDark,
        },
        charity_name : {
            displayName : 'Charity Name',
            headerStyle : styles.headerDark,
        },
        amount : {
            displayName : 'Amount',
            headerStyle : styles.headerDark,
        },
        date : {
            displayName : 'Paid At',
            headerStyle : styles.headerDark,
        },
    }

    const dataset = [];
    Donation.aggregate([
        {$match : {giverId : id}},
        {$lookup: {from: "causes",localField: "causeId",foreignField: "id",as: "donatedCauses"}},
        {$unwind : "$donatedCauses"},
        {$lookup: {from: "users", localField: "donatedCauses.ownerId",foreignField: "id",as: "userinfo"}},
        {$unwind : "$userinfo"},
        {$sort:{created_at:-1}}
    ],function(err, docs){
        if (err){
            cb(specification, []);
        }else{
            docs.forEach(function(doc, no){
                dataset.push({
                    no:no+1,
                    amount:doc.amount.toFixed(2),
                    date: moment(doc.created_at).format("YYYY-MM-DD HH:mm:ss"),
                    charity_name:doc.userinfo&&doc.userinfo.fullName?doc.userinfo.fullName:"n/a"
                })
            });
            cb(specification, dataset);
        }
    });
}