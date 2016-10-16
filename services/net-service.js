/** 
 * Network service module
 * @module {util} netService
 */

var ipAddress;
/** 
 * Get IP address of the server
 */


exports.getIpAddress = function() {
    console.log("Getting IP address")
    var exec = require('child_process').exec;
    exec('curl -s http://whatismyip.akamai.com/', function(error, IP) {
        if (error) {
            console.log(error);
        }
        ipAddress = IP;
    });
}