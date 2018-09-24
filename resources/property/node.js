var fs = require('fs');

var getReplace = function(str) {
    return str.replace(/href=\"([^\"]+)\"/gi, function(d){
        var ds = d.split('="');
        ds[1] = 'https://www.w3.org/TR/CSS22/' + ds[1];
        var result = ds[0] + '="' + ds[1] + ' target="_blank" ';
        return result;
    });
};

fs.readFile('./index.html', function(args, data){
    data = data.toString().trim();
    var content = getReplace(data);
    var filename = 'index2';
    fs.writeFileSync('./' + filename + '.html', content);
});