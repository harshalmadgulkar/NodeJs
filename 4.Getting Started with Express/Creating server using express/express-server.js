const express = require('express');

// Create server
const server = express();

// Handle default request
server.get('/', (req, res) => {
  res.send('Welcome to Express Server');
});

// Listen on specified port
server.listen(3100, () => {
  console.log('Server is running on port 3100');
});
