/**
 * @fileOverview Nginx Config Page
 * @author Thomas Devisscher devisscher.thomas@gmail.com
 * @version 0.0.1
 * @class Nginx
 * @classdesc Nginx Class
 */
var express = require('express');

var router = express.Router();
var toMarkdown = require('to-markdown');
var pm2 = require('pm2');
var marked = require('marked');
var fs = require('fs'),
    path = require('path');
/** Gets Directories
 * @param {string} srcpath - The path of the folder for which you want to list directories.
 */
function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

function getFiles(srcpath) {
    return fs.readdirSync(srcpath)
}
/** GET ```/nginx/:site```
 * 
 * Reads the config file for the site passed in as a param.
 * @member nginx
 * @memberof Nginx
 */
router.get('/nginx/:site', function(req, res, next) {
    if (req.params.site) {
        var path = '/etc/nginx/sites-available/' + req.params.site;
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.render('nginx', { title: req.params.site, data: data });
        });
    }
});
/** TODO: POST ```/nginx/:site```
 * 
 * Reads the config file for the site passed in as a param.
 * @memberof Nginx
 */
router.post('/nginx/:site', function(req, res, next) {
    if (req.params.site) {
        var path = '/etc/nginx/sites-available/' + req.params.site;
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.render('index', { title: req.params.site, data: data });
        });
    }
});
/** GET ```/nginx/reload```
 * 
 * Hosts for machine on which Dashnode is running 
 * @member /nginx/reload
 * @memberof Nginx
 */
router.get('/nginx/reload', function(req, res, next) {
    var exec = require('child_process').exec;
    exec('node -v', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            res.send('exec error: ' + error);

        }
    });
});
/** POST ```/nginx/:site/start```
 * 
 * Posts a new site configuration to sites-available
 * @member /nginx/:site/start
 * @memberof Nginx
 */
router.post('/nginx/:site/start', function(req, res, next) {
    if (req.params.site) {
        var path = '/etc/nginx/sites-available/' + req.params.site;
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.render('index', { title: req.params.site, data: data });
        });
    }
});
/** POST ```/nginx/:site/end```
 * 
 * Deletes site configuratoin
 * @member /nginx/:site/end
 * @memberof Nginx
 */
router.post('/nginx/:site/end', function(req, res, next) {
    if (req.params.site) {
        var path = '/etc/nginx/sites-available/' + req.params.site;
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.render('index', { title: req.params.site, data: data });
        });
    }
});

/** POST ```/nginx/save-nginx-config```
 * 
 * Save site configuratoin
 * @member /nginx/save-nginx-config
 * @memberof Nginx
 */
router.post('/save-nginx-config', function(req, res, next) {
    var envPort = req.body.port;
    var domainName = req.body.domainName;
    var envPath = 'public/example.server.config.com';
    var envPathOut = 'public/example1.server.config.com';
    var envPath = 'public/example.server.config.com';
    var envPathOut = '/etc/nginx/sites-available/' + domainName;
    fs.readFile(envPath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result =
            data.replace("<%port%>", envPort)
            .replace("<%server_name%>", domainName);



        fs.writeFile(envPathOut, result, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            };
        });
    });
});
module.exports = router;