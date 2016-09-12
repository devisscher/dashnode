var express = require('express');
var router = express.Router();
var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}
/* GET home page. */
router.get('/', function(req, res, next) {
    var directories = getDirectories('/Users/tdev');
    res.render('index', { title: 'Directory', directories: directories });
});
router.get('/hosts', function(req, res, next) {
    fs.readFile('/etc/hosts', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.render('index', { title: 'hosts', data: data });
    });
});

router.get('/nginx', function(req, res, next) {
    var directories = getDirectories('/etc/nginx/sites-available');
    res.render('index', { title: 'Directory', directories: directories });
});

module.exports = router;