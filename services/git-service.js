/** 
 * Git service module
 * @module {util} gitService
 */

/** 
 * Git pull latest version of app
 * @param {string} Git url
 */

exports.gitInitializeRepository = function(gitRepo, domainName) {
    var exec = require('child_process').exec;
    var script = "git init /var/www/" + domainName;
    exec(script, function(error, stdout, stderr) {
        if (error) {
            console.log(error)
        } else {
            console.log(stdout);
        }
    });
    
}

exports.createAppDirectory = function(gitRepo, domainName) {
    var createDir = "mkdir /var/www/" + domainName;
    var exec = require('child_process').exec;
    exec(createDir, function(error, stdout, stderr) {
        if (error) {
            console.log(error)
        } else {
            console.log(stdout);
        }
    });
}