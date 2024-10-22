// Please don't change the pre-written code.

const express = require('express');
const app = express();

const logRequest = (req, res, next) => {
  // Write your code here
  console.log(req.method);
  console.log(req.url);
  next();
};

// This route should only be accessible after passing through the 'logRequest' middleware.
// Make necessary changes in the route below.
app.get('/', logRequest, (req, res) => {
  res.send('Coding Ninjas!H');
});

module.exports = app;
