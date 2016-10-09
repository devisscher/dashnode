var express = require('express');
var router = express.Router();
var toMarkdown = require('to-markdown');
var pm2 = require('pm2');
var path = require('path');
var marked = require('marked');
var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

function getFiles(srcpath) {
    return fs.readdirSync(srcpath)
}
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
router.get('/add-site', function(req, res, next) {
    // create .env file with port
    // get .env if exists
    // create nginx config with name of domain and create a symlink in sites-enabled
    // create record in db
    // server name
    // etc

    var envPath = '.env';
    console.log(envPath);
    fs.readFile(envPath, 'utf8', function(err, data) {
        if (err) {
            data = "LOCALPORT=8080";
            console.log(err);
        }
        var srcpath = '/home/';
        var srcpathLocal = '/Users/tdev/Sites/node/';
        var directories = getDirectories(srcpathLocal);
        var vm = {
            title: "New site",
            directories: directories,
            envVariables: data,
        }
        res.render('sites/new', vm);
    });
});
router.post('/save-nginx-config', function(req, res, next) {
    var envPort = req.body.port;
    var domainName = req.body.domainName;
    var envPath = 'public/example.server.config.com';
    var envPathOut = 'public/example1.server.config.com';
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