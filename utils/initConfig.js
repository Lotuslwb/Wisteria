var inquirer = require('inquirer');
var fs = require('fs');


function init() {

    var config = {};
    var questionlist = require('../utils/qustions');
    var index = 0;

    genQuestion(function () {
        console.log(config);
        var url = __dirname + '/config/' + config.productName + '.json';
        fs.writeFileSync(url, JSON.stringify(config), 'utf-8');

    });

    function genQuestion(callback) {
        if (index < questionlist.length) {
            initQustion(questionlist[index], function () {
                genQuestion(callback)
            });
            index++;
        } else {
            callback && callback();
        }
    }

    function initQustion(option, callback) {
        return inquirer.prompt([{
            type: 'input',
            name: option.name,
            message: option.message,
            validate: function (input) {
                return input.length > 0
            }
        }]).then(function (answers) {
            for (key in answers) {
                config[key] = answers[key];
            }
            callback && callback();
        })
    }
}


module.exports = init;