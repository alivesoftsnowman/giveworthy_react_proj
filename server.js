var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require("path");
require('dotenv').config();
require('rootpath')();


var routes = require('backend/config/router'); // This is routes instance for all routing

var app = express();


/**
 * Database connect
 */
const mongoMaxRetries = 100;
const defaultRetryMiliSeconds = 5000;
var mongoRetries = mongoMaxRetries;
var mongooseOptions = {
    db: {
        readPreference: "ReadPreference.SECONDARY",
        retryMiliSeconds: defaultRetryMiliSeconds
    },
    server: {
        auto_reconnect: true,
        socketOptions: {
            keepAlive: 30000,
            connectTimeoutMS: 30000,
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 30000,
            connectTimeoutMS: 30000
        }
    }
}

function mongoDbConnect() {
    console.log('connecting with ' + process.env.MGDB_URI);
    mongoose.connect(process.env.MGDB_URI, mongooseOptions);
}
mongoDbConnect();

mongoose.connection.on('error', function(err) {
    console.log('MongoDB connection error:' + err);
});
mongoose.connection.on('connecting', function() {
    console.log('Reconnecting to DB');
});
mongoose.connection.on('connected', function() {
    console.log("----->Database connected successfully...");
    // Reset
    mongoRetries = mongoMaxRetries;
    mongooseOptions.db.retryMiliseconds = defaultRetryMiliSeconds;
});
mongoose.connection.on('reconnected', function() {
    console.log("----->Datbase successfully reconnected");
});
mongoose.connection.on('disconnected', function() {
    console.log("----->Database disconnected... retries left: " + mongoRetries + " retry delay: " + mongooseOptions.db.retryMiliSeconds);
    if (mongoRetries > 0) {
        // Increase back off
        mongooseOptions.db.retryMiliSeconds += 100 * (mongoMaxRetries - mongoRetries);
        mongoDbConnect();
        mongoRetries--;
    } else {
        console.log("No mongodb connection retries left. Quitting.");
        process.exit(1);
    }
});
// create maseter account when connecting db if it was not created already
mongoose.connection.once('open', function(){
    const User = require("./backend/models/user");
    const uuid = require('uuid/v1');
    User.findOne({type:'admin'},function(err, doc){
        if (err){
            console.log(err);
        }else{
            if (!doc || doc.length==0){
                var user = new User({
                    fullName: process.env.ADMIN_USERNAME,
                    familyName: process.env.ADMIN_USERNAME,
                    id: uuid(),
                    password: process.env.ADMIN_PASSWORD,
                    email:process.env.ADMIN_EMAIL,
                    type:'admin'
                });
                user.save();
                console.log("Admin user created.");
            }
        }
    });
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


/**
 * enable CORS for every request...
 */

var corsOptions = {
    allowedHeaders: ['Content-Type', 'Authorization', 'accept', 'x-auth-token', 'x-user-type']
}
app.use(cors(corsOptions));
app.options('/', cors(corsOptions));


// view engine setup
//  app.set('views', path.join(__dirname, 'app/views'));
//  app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static("build"));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

// call route setup function....
routes.setup(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

require("backend/crond");

module.exports = app;