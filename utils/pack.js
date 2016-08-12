var fs = require('fs');
var archiver = require('archiver');
var log = require('../utils/info');


function obj(productName, pw) {
    this.productName = productName;
    this.pw = pw;
    this.init();
}


obj.prototype = {
    init: function () {
        var configURL = this.configURL = __dirname + '/config/' + this.productName + '.json';
        var me = this;

        fs.exists(configURL, function (exists) {
            if (exists) {
                //配置文件存在
                me.package(me);
            } else {
                log.error('配置文件不存在,wis -help可以参看帮助');
            }
        });

    },
    package: function (me) {
        var config = fs.readFileSync(me.configURL, 'utf-8');

        config = JSON.parse(config);

        var outputURL = config.productURL + config.productName + '.zip';

        var output = fs.createWriteStream(outputURL);
        var archive = archiver('zip');

        archive.on('error', function (err) {
            log.error('压缩报错');
            log.error(err);
            throw err;
        });
        output.on('close', function () {
            log.ok('压缩成功');
            require('../utils/ssh2')(config, me.pw);
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
}


module.exports = function (productName, pw) {
    new obj(productName, pw);
};
