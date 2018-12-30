/**
 * @description: Donation model to log giver donation 
 * @name: DonationSchema
 * @param: 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonationSchema = new Schema({
    id:{
        type: String, 
        unique: true
    },
    causeId:  {
        type: String
    },
    giverId:{
        type: String
    },
    amount:  {
        type: Number
    },
    created_at: {
        type: Date
    }
});
DonationSchema.pre('save', function(next){
    var donation = this;
    donation.created_at = new Date();
    next();
});

module.exports = mongoose.model('Donation', DonationSchema);