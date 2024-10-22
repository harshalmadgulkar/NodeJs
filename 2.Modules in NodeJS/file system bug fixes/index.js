const fs = require('fs');

const Solution = () => {
  fs.appendFile('note.txt', 'new data', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('data successfully updated');
      fs.readFile('note.txt', 'utf-8', (data, err) => {
        err ? console.log(err) : console.log(data);
      });
    }
  });
};
Solution();
module.exports = Solution;
