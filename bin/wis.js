#!/usr/bin/env node


var program = require('commander');
var packageInfo = require('../package.json');
var log = require('../utils/info');

//commander
program
    .version(packageInfo.version)
    .option('-l, --list', '查看支持的checklist')

program.command('pack <url>')
    .description('打包一下')
    .action(function (url, options) {
        require('../utils/pack')(url);
    });


program.command('ssh2 <url>')
    .description('上传到跳板机')
    .action(function (url, options) {
        require('../utils/ssh2')(url);
    });

program.parse(process.argv);


if (program.list) {
    console.log('你不会真的以为有这样的功能吧? 傻逼~~~');
}


function IsURL(str_url) {
    var strRegex = /^((http|https|ftp):\/\/)+(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
    var re = new RegExp(strRegex);

    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}
