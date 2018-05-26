var fs = require('fs');
var parse = require('csv-parse');

var inputFile = './AIS-Code.txt';

var AIS_Code = [];
var parser = parse({delimiter: '\t'}, function (err, data) {
    data.forEach(function(line) {
        var order = line[1];
        var code = line[2];
        var label = line[4];

        var orderArray = order.split('.');
        var orderLength = orderArray.length;

        var object = {'name': label, 'code': code, 'sub': []};
        if (orderLength == 1 && AIS_Code.indexOf(label) === -1 && label !== "Label DE") {
            AIS_Code.push(object);
        }
        if (orderLength == 2) {
            AIS_Code[getIndex(orderArray, 0)].sub.push(object);
        }
        if (orderLength == 3) {
            AIS_Code[getIndex(orderArray, 0)].sub[getIndex(orderArray, 1)].sub.push(object);
        }
        if (orderLength == 4) {
            AIS_Code[getIndex(orderArray, 0)].sub[getIndex(orderArray, 1)].sub[getIndex(orderArray, 2)].sub.push(object);
        }
        if (orderLength == 5) {
            AIS_Code[getIndex(orderArray, 0)].sub[getIndex(orderArray, 1)].sub[getIndex(orderArray, 2)].sub[getIndex(orderArray, 3)].sub.push(object);
        }
        if (orderLength == 6) {
            AIS_Code[getIndex(orderArray, 0)].sub[getIndex(orderArray, 1)].sub[getIndex(orderArray, 2)].sub[getIndex(orderArray, 3)].sub[getIndex(orderArray, 4)].sub.push(object);
        }
    });
    console.log(AIS_Code);

    fs.writeFile("AIS.json", JSON.stringify(AIS_Code), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

});

fs.createReadStream(inputFile)
    .pipe(parser);

var getIndex = function(orderArray, pos) {
    return parseInt(orderArray[pos], 10) -1;
}
