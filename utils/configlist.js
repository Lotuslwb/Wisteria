var fs = require('fs');
var log = require('../utils/info');

function configlist() {
    var url = __dirname + '/config/';
    fs.readdir(url, function (err, fileNameArray) {
        for (var i = 0; i < fileNameArray.length; i++) {
            log.info(fileNameArray[i]);
        }
    });
}


module.exports = configlist;