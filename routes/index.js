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
    var srcpath = '/etc/nginx/sites-available';
    var files = getFiles('/etc/nginx/sites-available');
    console.log(files);
    res.render('nginx', { title: 'Sites Available', directories: files });
});
router.get('/apps', function(req, res, next) {
    var srcpath = '/home/';
    var directories = getDirectories('/home/');
    console.log(directories);
    res.render('index', { title: 'Applications', directories: directories });
});
router.get('/appstart/:name', function(req, res, next) {
    var appRoot = "/home/" + req.params.name;
    var exec = require('child_process').exec;
    exec('forever start ' + appRoot + "/bin/www", function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            res.send('exec error: ' + error);

        } else {
            res.send('Successfully started ' + req.params.name);
        }
    });
});
router.get('/appstop/:name', function(req, res, next) {
    var appRoot = "/home/" + req.params.name;
    var exec = require('child_process').exec;
    exec('forever stop ' + appRoot + "/bin/www", function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            res.send('exec error: ' + error);

        } else {
            res.send('Successfully started ' + req.params.name);
        }
    });
});
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
// Save file
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
// Start or stop process
router.post('/nginx/reload', function(req, res, next) {
    var exec = require('child_process').exec;
    exec('node -v', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            res.send('exec error: ' + error);

        }
    });
});

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

module.exports = router;