var express = require('express');
var router = express.Router();
var fs = require('fs'),
    path = require('path');

// Start or stop process
router.get('/reload', function(req, res, next) {
    var exec = require('child_process').exec;
    exec('sudo service nginx reload', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            res.send('exec error: ' + error);

        } else {
            res.send('Successfully reloaded NGINX config');
        }
    });
});

module.exports = router;