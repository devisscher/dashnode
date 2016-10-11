/**
 * @fileOverview Dashnode Settings Page
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @version 0.0.1
 */
var express = require('express');
var mongoose = require('mongoose');
var Setting = require('../models/settings');
var path = require('path');
var router = express.Router();
var ipAddress;

function getIpAddress() {
    console.log("Getting IP address")
    var exec = require('child_process').exec;
    exec('curl -s http://whatismyip.akamai.com/', function(error, IP) {
        if (error) {
            console.log(error);
        }
        ipAddress = IP;
    });
}
/* GET settings listing. */
router.get('/', function(req, res, next) {
    var theIp = getIpAddress();
    var vm = {
        title: "Settings",
        ipAddress: ipAddress
    }
    res.render('settings', vm);
});

module.exports = router;