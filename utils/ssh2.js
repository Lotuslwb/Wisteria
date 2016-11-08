var fs = require('fs');
var log = require('../utils/info');
var Client = require('ssh2').Client;

var cp = require('child_process');

var _ = require('lodash');


function connectToServer(config, pw) {

    var tpl = 'scp -P <%= boardPort %>  <%= productURL %>{<%= productName %>.zip,<%= productName %>.sh} <%= boardUserName %>@<%= boardIP %>:<%= boardURL %>';

    var script = _.template(tpl)(config);

    cp.exec(script, {}, function (err, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);


        log.ok('上传成功');

        var conn = new Client();
        conn.on('ready', function () {

            conn.exec('bash ' + config.productName + '.sh', function (err, stream) {
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
            });
        }).connect({
            host: config.boardIP,
            port: config.boardPort,
            username: config.boardUserName,
            password: pw
        });

    })

}


module.exports = connectToServer;
