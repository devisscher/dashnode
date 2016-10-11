/**
 * @fileOverview Sites Config Page
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @version 0.0.1
 * @class Sites
 * @classdesc Sites Class
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var toMarkdown = require('to-markdown');
var pm2 = require('pm2');
var path = require('path');
var marked = require('marked');
var Site = require('../models/site');
var fsService = require('../services/fs-service');
var fs = require('fs'),
    path = require('path');



/** GET ```/sites```
 * 
 * Sites for which a process is registered.
 * @member sites
 * @memberof Sites
 */
router.get('/', function(req, res, next) {
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        } else {
            pm2.list(function(err, list) {
                var vm = {
                    title: 'Dashnode',
                    results: list
                }
                res.render('sites/index', vm);
            })
        }
    });
});

/** GET ```/add-site```
 * 
 * Register a new process to run a site.
 * @member add-site
 * @memberof Sites
 */
router.get('/add-site', function(req, res, next) {
    var directories = fsService.getDirectories('/var/www');
    var vm = {
        title: "New site",
        directories: directories
    }
    res.render('sites/new', vm);
});
/** POST ```/add-site```
 * 
 * Register a new process to run a site.
 * @property {string} gitRepo url
 * @property {string} domainName url
 * @member add-site
 * @memberof Sites
 */
router.post('/add-site', function(req, res) {
    var gitRepo = req.body.domainName;
    var domainName = req.body.domainName;
    mongoose.model('Site').create({
        gitRepo: gitRepo,
        domainName: domainName
    }, function(err, site) {
        if (err) {
            console.log(err);
        }
        gitPullRepository(gitRepo, domainName);
        res.redirect('/');
    });

});





module.exports = router;