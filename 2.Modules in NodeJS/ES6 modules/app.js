// app.js - our main application file
// const math = require("./math.js");
import * as math from './math.js';

const nums = [1, 2, 3, 4, 5, 6, 7];
console.log(`The sum is ${math.sum(nums)}`);
console.log(`The mean is ${math.mean(nums)}`);
