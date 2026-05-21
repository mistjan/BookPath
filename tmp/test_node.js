const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/56265/Documents/BookPath/lib/awards-data.json', 'utf8'));

// Test: read and write back unchanged
fs.writeFileSync('C:/Users/56265/Documents/BookPath/lib/awards-data-test.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Awards:', data.length);
console.log('Nobel:', data[0].nameCn);
console.log('Nobel editions:', data[0].awardEditions.length);