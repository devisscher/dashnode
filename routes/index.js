var express = require('express');
var router = express.Router();
var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

function getFiles(srcpath) {
    fs.realpath(__dirname, function(err, path) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Path is : ' + path);
    });
    fs.readdir(__dirname, function(err, files) {
        if (err) return;
        files.forEach(function(f) {
            console.log('Files: ' + f);
        });
    });
}
router.get('/hosts', function(req, res, next) {
    fs.readFile('/etc/hosts', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.render('index', { title: 'hosts', data: data });
    });
});

router.get('/nginx', function(req, res, next) {
    var files = getFiles('/etc/nginx/sites-available');
    console.log(files);
    res.render('index', { title: 'Directory', directories: files });
});

module.exports = router;