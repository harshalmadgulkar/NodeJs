// Please don't change the pre-written code
// Import the necessary modules here
const fs = require('fs');

const Solution = () => {
  // Write your code here
  // create file
  fs.writeFileSync('notes.txt', 'The world has enough coders');
  // read file
  const buffer = fs.readFileSync('notes.txt', { encoding: 'utf-8' });
  console.log(buffer);
  // Append data in File
  fs.appendFileSync('notes.txt', 'BE A CODING NINJA!');
  // read file
  const updatedBuffer = fs.readFileSync('notes.txt', { encoding: 'utf-8' });
  console.log(updatedBuffer);
  // Delete the file
  // fs.unlinkSync('notes.txt');
};
Solution();
module.exports = Solution;
