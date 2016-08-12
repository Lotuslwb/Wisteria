var fs = require('fs');
var archiver = require('archiver');
var log = require('../utils/info');


module.exports = function (url) {
    var output = fs.createWriteStream('/Users/lotuslwb/Documents/work/merchantcenter/admin_merchant.zip');
    var archive = archiver('zip');

    archive.on('error', function (err) {
        log.error('压缩报错');
        log.error(err);
        throw err;
    });
    output.on('close', function () {
        log.ok('压缩成功');
        require('../utils/ssh2');
    });

    archive.pipe(output);
    archive.bulk([
        {
            expand: true,
            //路径
            cwd: '/Users/lotuslwb/Documents/work/merchantcenter/',
            //路径下面匹配哪些文件需要压缩
            src: ['admin_merchant/**'],
        }
    ]);
    archive.finalize();

}
