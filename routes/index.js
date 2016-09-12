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
    return fs.readdirSync(srcpath)
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
    files.forEach(function(err, file) {
        fs.statsSync(file, function(err, stats) {
            if (err) {

            }
            console.log(stats);
        });
    });
    console.log(files);
    res.render('index', { title: 'Sites Available', directories: files });
});

module.exports = router;