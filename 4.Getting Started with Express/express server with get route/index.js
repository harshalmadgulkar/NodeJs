// Please don't change the pre-written code
// Import the necessary modules here
const express = require('express');
// Write your code here
// create server instance
const server = express();

// Create get route
server.get('/', (req, res) => {
  res.send('Be a Coding Ninja');
});

module.exports = { server };
