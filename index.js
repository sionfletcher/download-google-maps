var fs = require('fs');
var request = require('request');
var key = require('./key.json');

const api = 'https://maps.googleapis.com/maps/api/staticmap';
fs.readFile('./data.json', 'utf8', (err, data) => {

    const locations = JSON.parse(data);

    var i = 0;
    setInterval(() => {

        const loc = locations[i].slice(2).join().replaceAll(' ', '+');
        const url = `${api}?center=${loc}&zoom=16&size=600x300&maptype=satellite&key=${key.key}`;
        request(url).pipe(fs.createWriteStream(`output/${pad(i, 5)}.png`));

        console.log(url);

        i++;

    }, 1000);

});



// HELPER METHODS

// Replace all characters, rather than just the first result
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// 001
// 002
// 003
// PADDING
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}