// 1. Import readline
const readline = require('readline');

// 2. configure interface to connect with terminal or command line
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 3. Reading values
interface.question('Enter first number', (num1) => {
  interface.question('Enter second number', (num2) => {
    const sum = Number(num1) + Number(num2);
    console.log(sum);
  });
});
