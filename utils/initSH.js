function initSH(productName) {
    var fs = require('fs');
    var _ = require('lodash');

    var tpl = fs.readFileSync(__dirname + '/tpl.sh', 'utf-8');
    var data = fs.readFileSync(__dirname + '/config/' + productName + '.json', 'utf-8');

    data = JSON.parse(data);

    var genShStr = _.template(tpl)(data);

    var genShUrl = data.productURL + data.productName + '.sh';

    fs.writeFileSync(genShUrl, genShStr, 'utf-8');

    return genShUrl;
}

module.exports = initSH;









