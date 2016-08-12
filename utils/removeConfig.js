var fs = require('fs');
var cp = require('child_process');
var log = require('../utils/info');

function removeConfig(productName) {
    var url = __dirname + '/config/' + productName + '.json';
    cp.exec('rm -rf ' + url, {}, function (err) {
        if (err) {
            log.error(err);
        } else {
            log.ok('删除成功')
        }
    });
}


module.exports = removeConfig;