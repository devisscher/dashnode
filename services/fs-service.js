/** 
 * FS module
 * @module {util} fsService
 */


var fs = require('fs'),
    path = require('path');
/**
 * Gets directories for srcpath given.
 * 
 * @param {string} srcpath
 * @returns directories
 */
exports.getDirectories = function(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

/**
 * Gets files for srcpath given.
 * 
 * @param {string} srcpath
 * @returns files
 */
exports.getFiles = function(srcpath) {
    return fs.readdirSync(srcpath)
}