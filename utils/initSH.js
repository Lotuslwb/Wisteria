var fs = require('fs');
var _ = require('lodash');

var tpl = fs.readFileSync(__dirname + '/tpl.sh', 'utf-8');
var data = fs.readFileSync(__dirname + '/config/hehe.json', 'utf-8');

data = JSON.parse(data);

var genShStr = _.template(tpl)(data);

console.log(genShStr);




