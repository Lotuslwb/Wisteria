/**
 * Created by lotuslwb on 16/5/26.
 */


var log = require('./utils/info');

module.exports = function (url) {
    var zipUrl = require('./utils/pack')(url);
    log.ok(zipUrl);
}

