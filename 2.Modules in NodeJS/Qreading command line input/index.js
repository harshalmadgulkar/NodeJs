// Import required module
const readline = require('readline');
const qinterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Solution = () => {
  // Write your code here
  qinterface.question('Enter first number: ', (num1) => {
    qinterface.question('Enter second number: ', (num2) => {
      let max;
      if (parseFloat(num1) > parseFloat(num2)) {
        max = num1;
      } else if (parseFloat(num1) < parseFloat(num2)) {
        max = num2;
      } else {
        max = 'Both numbers are equal';
      }
      console.log(`The maximum number is: ${max}`);
      qinterface.close();
    });
  });
};

Solution();
module.exports = Solution;
