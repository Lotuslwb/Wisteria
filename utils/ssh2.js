var fs = require('fs');
var log = require('../utils/info');
var Client = require('ssh2').Client;

var cp = require('child_process');


var config = fs.readFileSync(__dirname + '/config/hehe.json', 'utf-8');

config = JSON.parse(config);


cp.exec('scp -P 443  /Users/lotuslwb/Documents/work/merchantcenter/{admin_merchant.zip,test.sh} appsvr@163.53.88.83:/home/appsvr/', {}, function (err, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);


    log.ok('上传成功');

    var conn = new Client();
    conn.on('ready', function () {

        conn.exec('bash test.sh', function (err, stream) {
            stream.on('data', function (data, stderr) {
                //打印 过程数据
                console.log(data + '');
            }).on('close', function (err, stderr) {
                //结束
                if (err) {
                    log.error(err);
                } else {
                    log.ok('解压成功')
                }
                conn.end();
            });


            // stream.on('close', function (code, signal) {
            //     conn.end();
            // }).on('data', function (data) {
            //     console.log('STDOUT: ' + data);
            // }).stderr.on('data', function (data) {
            //     console.log('STDERR: ' + data);
            // });
        });
    }).connect({
        host: '163.53.88.83',
        port: 443,
        username: 'appsvr',
        password: 'appsvr'
        //privateKey: require('fs').readFileSync('/home/admin/.ssh/id_dsa')
    });

})


module.exports = function (url) {

}
