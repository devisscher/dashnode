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
    var srcpath = '/Users/tdev/Desktop';
    var files = getFiles('/Users/tdev/Desktop');
    console.log(files);
    res.render('index', { title: 'Sites Available', directories: files });
});
router.get('/nginx/:site', function(req, res, next) {
    if (req.params.site) {
        var path = '/etc/nginx/sites-available' + req.params.site;
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.render('index', { title: 'hosts', data: data });
        });
    }
});

module.exports = router;