const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'home', 'data.txt');
console.log(filePath);

const filePathResolved = path.resolve('src', 'home', 'data.txt');
console.log(filePathResolved);

console.log(path.extname(filePathResolved));

// Read File Async
// fs.readFile(filePath, (err, data) => {
//   err ? console.log(err) : console.log(data.toString());
// });

// Write file Async
// fs.writeFile('employee.txt', 'new employee', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('File is written');
//   }
// });

// Append File Async
// fs.appendFile('employee.txt', '\nAnother employee', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('File is updated');
//   }
// });

// Delete File Async
// fs.unlink('employee.txt', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('File is Deleted.');
//   }
// });

// console.log('operation ended');
