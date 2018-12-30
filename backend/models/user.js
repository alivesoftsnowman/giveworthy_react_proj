/**
 * @description: User model
 * @name: UserSchema
 * @param: 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    id:{
        type: String, 
        required: true,
        unique: true
    },
    familyName:  {
        type: String
    },
    givenName:  {
        type: String
    },
    fullName:  {
        type: String
    },
    password: { 
        type: String
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    type:{
        type: String,
        default: 'giver',
        enum: ['giver','charity','admin']
    },
    gender: {
        type: String,
        default: 'male',
        enum: ['male','female']
    },    
    dob: {
      type: Date
    },
    googleID:  {
        type: String
    },
    FacebookID:  {
        type: String
    },
    zipcode:  {
        type: String
    },
    note:{
        type: String
    },
    imageURL: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    lastPaid_at:{
        type:Date
    },
    last_login: {
        type: Date
    },
    paymentInfo:{
        cardnumber:{type:String},
        expiry:{type:String},
        cvc:{type:String},
        addr1:{type:String},
        addr2:{type:String},
        state:{type:String},
        zipcode:{type:String},
        name:{type:String},
        cusid:{type:String}
    },
    loi:{
        environment:{type:Number},
        social:{type:Number},
        educational:{type:Number},
        animal:{type:Number},
        ngos:{type:Number},
        health:{type:Number},
        art_culture:{type:Number}
    },
    politicalIdeology:{
        type:Number
    },
    donationAmount:{
        type:Number
    },
    causeIdsForDonation:{
        type:[String]
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'locked', 'suspended']
    }
});
UserSchema.pre('save', function(next){
    var user = this;
    user.updated_at = new Date();
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

});
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);