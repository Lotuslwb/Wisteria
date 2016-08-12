#!/usr/bin/env node


var program = require('commander');
var packageInfo = require('../package.json');
var log = require('../utils/info');

//commander
program
    .version(packageInfo.version)
    .option('-l, --list', '查看支持的checklist')

program.command('pack <productName> <password>')
    .description('打包一下')
    .action(function (productName, password, options) {
        require('../utils/pack')(productName, password);
    });


program.command('init')
    .description('初始化config')
    .action(function (options) {
        require('../utils/initConfig')();
    });

program.command('ls')
    .description('查看已有项目')
    .action(function (options) {
        require('../utils/configlist')();
    });

program.command('remove <productName>')
    .description('删除已有项目  <productName> ')
    .action(function (productName, options) {
        require('../utils/removeConfig')(productName);
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
