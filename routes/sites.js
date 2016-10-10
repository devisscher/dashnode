var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var toMarkdown = require('to-markdown');
var pm2 = require('pm2');
var path = require('path');
var marked = require('marked');
var Site = require('../models/sites');
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
function gitPullRepository(gitRepo, domainName) {
   var exec = require('child_process').exec;
    exec('git pull -C "/var/www/ "' + domainName + "/ " +  gitRepo, function(error, stdout, stderr) {
        if (error) {
        console.log(error)
        } else {
            console.log(stdout);
        }
    });
}
router.get('/', function(req, res, next) {
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        else {
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
    var directories = getDirectories('/var/www');
    var vm = {
        title: "New site",
        directories : directories
    }
        res.render('sites/new', vm);
});
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