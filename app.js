var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dashnode');
var routes = require('./routes/index');
var users = require('./routes/users');
var sites = require('./routes/sites');
var settings = require('./routes/settings');
var nginx = require('./routes/nginx');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/** Get IP Address
 * Sets the IP address on which Dashnode is running
 */
function getIpAddress() {
    console.log("Getting IP address")
    var exec = require('child_process').exec;
    exec('curl -s http://whatismyip.akamai.com/', function(error, IP) {
        if (error) {
            console.log(error);
        } else {
            app.locals.ipAddress = IP;
        }
    });
};
getIpAddress();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
app.use(express.static(path.join(__dirname, 'docs/')));

app.use('/', routes);
app.use('/users', users);
app.use('/sites', sites);
app.use('/nginx', nginx);
app.use('/settings', settings);

/** error
 * 
 * Development error handler
 * @member error
 */
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
/** error
 * 
 * Production error handler
 * @member error
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;