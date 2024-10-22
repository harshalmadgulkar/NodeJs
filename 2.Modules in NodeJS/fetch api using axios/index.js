// Please do not change the prewritten code
const axios = require('axios');

const Solution = async () => {
  // Write your code here
  const res = axios
    .get('https://api.codingninjas.com/api/v3/event_tags')
    .then((res) => {
      console.log(res.data);
    });
};
Solution();
module.exports = Solution;
