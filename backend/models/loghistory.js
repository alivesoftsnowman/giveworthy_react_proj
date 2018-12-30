/**
 * @description: Log History model to record cause  
 * @name: LogHistorySchema
 * @param: 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogHistorySchema = new Schema({
    id:{
        type: String, 
        unique: true
    },
    causeId:  {
        type: String
    },
    userId:{
        type: String
    },
    postType:{
        type:String
    },
    content:  {
        type: String
    },
    created_at: {
        type: Date
    }
});
LogHistorySchema.pre('save', function(next){
    var logHistory = this;
    logHistory.created_at = new Date();
    next();
});

module.exports = mongoose.model('LogHistory', LogHistorySchema);