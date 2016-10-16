/**
 * @fileOverview Dashnode Settings Page
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @version 0.0.1
 */
var express = require('express');
var mongoose = require('mongoose');
var Setting = require('../models/settings');
var fsService = require('../services/fs-service');
var netService = require('../services/net-service');
var path = require('path');
var router = express.Router();




router.get('/', function(req, res, next) {
    var ipAddress = netService.getIpAddress();
    var vm = {
        title: "Settings",
        ipAddress: ipAddress
    }
    res.render('settings', vm);
});



module.exports = router;