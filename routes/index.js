/**
 * @fileOverview Home page Dashboard page
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @version 0.0.1
 * @class Index
 * @classdesc Index Class
 */
var express = require('express');
var router = express.Router();
var toMarkdown = require('to-markdown');
var pm2 = require('pm2');
var marked = require('marked');
var fs = require('fs'),
    path = require('path');

var fsService = require('../services/fs-service');
/** GET ```/```
 * 
 * Home Page. 
 * @member /
 * @memberof Index
 */
router.get('/', function(req, res, next) {
    //var filesProd = getFiles('/etc/nginx/sites-available');
    var files = fsService.getFiles('/Users/tdev/Sites');
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        } else {
            pm2.list(function(err, list) {
                var vm = {
                    title: 'Dashnode Overview',
                    results: list,
                    directories: files
                }
                res.render('index', vm);
            });
        }
    });
});
/** GET ```/hosts```
 * 
 * Hosts for machine on which Dashnode is running 
 * @member hosts
 * @memberof Index
 */
router.get('/hosts', function(req, res, next) {
    fs.readFile('/etc/hosts', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.render('index', { title: 'hosts', data: data });
    });
});
/** GET ```/apps```
 * 
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @description gets list of folders in apps folder.
 * @property {array} [{ title: 'Applications', directories: directories }]
 * @member apps
 * @memberof Index
 */
router.get('/apps', function(req, res, next) {
    var srcpath = '/home/';
    var directories = getDirectories('/home/');
    console.log(directories);
    res.render('index', { title: 'Applications', directories: directories });
});

/** GET ```/appstartpm```
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @description Start application.
 * @property {query} execPath ?execPath=path_to_node_start_script
 * @member appstartpm
 * @memberof Index
 */
router.get('/appstartpm', function(req, res) {
    var startScript = req.query.execPath;
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            script: startScript, // Script to be run
            exec_mode: 'cluster', // Allow your app to be clustered
            instances: 4, // Optional: Scale your app by 4
            max_memory_restart: '100M' // Optional: Restart your app if it reaches 100Mo
        }, function(err, apps) {
            pm2.disconnect(); // Disconnect from PM2
            if (err) throw err
        });
        res.redirect('/');
    });
});
/** GET ```/appstoppm```
 * 
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @description  Stop application
 * @property {query} execPath ?execPath=path_to_node_start_script
 * @member appstoppm
 * @memberof Index
 */
router.get('/appstoppm', function(req, res, next) {
    var startScript = req.query.execPath;
    var exec = require('child_process').exec;
    exec('pm2 stop ' + startScript, function(error, stdout, stderr) {
        if (stderr) {

        } else {
            console.log(stdout);
        }
    });
    setTimeout(function() {
        res.redirect('/');
    }, 5000);
});
/** GET /pulllatest
 * 
 * Pulls latest version of app from gitHub
 * @member /pulllatest
 */
router.get('/pulllatest', function(req, res) {
    var repoHttps = req.query.repo;
    var execPath = req.query.execPath;
    var exec = require('child_process').exec;
    exec('git pull ' + repoHttps + " " + execPath, function(error, stdout, stderr) {
        res.send(stdout);
    });
});
module.exports = router;