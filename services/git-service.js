/** 
 * Git service module
 * @module {util} gitService
 */

/** 
 * Git pull latest version of app
 * @param {string} Git url
 */

exports.gitPullRepository = function(gitRepo) {
    var exec = require('child_process').exec;
    exec('git pull -C "/var/www/ "' + domainName + "/ " + gitRepo, function(error, stdout, stderr) {
        if (error) {
            console.log(error)
        } else {
            console.log(stdout);
        }
    });
}