// import fs module
const fs = require('fs');

// Reading file in blocking code that is
// each operation will be performed by main thread
console.log('starting to read');
// Reading Files
// Method I
// const buffer = fs.readFileSync('./data.txt');
// console.log(buffer.toString());

// Method II
const buffer = fs.readFileSync('./data.txt', { encoding: 'utf8' });
console.log(buffer);

// Creating and writing a file
try {
  fs.writeFileSync('Employee.txt', 'Name: John Doe, Age:55, Position:Manager');
} catch (error) {
  console.log(error);
}

// Append another employee data
fs.appendFileSync(
  'Employee.txt',
  'Name: Harshal Madgulkar, Age: 23, Position: CTO'
);

// Deleting a file
try {
  fs.unlinkSync('./Harshal_Madgulkar_Resume_7559207299.pdf');
} catch (error) {
  console.log(error);
}

console.log('Perform another operation.');
