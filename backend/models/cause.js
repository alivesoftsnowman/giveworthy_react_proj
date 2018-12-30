/**
 * @description: Cause model
 * @name: CauseSchema
 * @param: 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CauseSchema = new Schema({
    id:{
        type: String, 
        unique: true
    },
    ownerId:  {
        type: String
    },
    name:{
        type: String
    },
    primaryVideoLink:  {
        type: String
    },
    photoLinks: { 
        type: [{
            src:String,
            width:Number,
            height:Number
        }]
    },
    webLink: { 
        type: String
    },
    tags:{
        type: [String]
    },
    description: {
        type: String
    },    
    summary: {
      type: String
    },
    details: {
        type: String
    },
    donationIds:  {
        type: [String]
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    status:{
        type: String,
        default: 'init',
        enum: ['init','reviewing','approve','deny']
    },
    financialDocLink: {
        type: String
    }
});
CauseSchema.pre('save', function(next){
    var cause = this;
    cause.updated_at = new Date();
    
    next();
});

module.exports = mongoose.model('Cause', CauseSchema);