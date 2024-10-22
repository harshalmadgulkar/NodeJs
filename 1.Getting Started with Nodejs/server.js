// Create server using nodejs

// 1. Import http library or module
const http = require('http');

// 2. Create server
const server = http.createServer((req, res) => {
  // here comes to request
  console.log(req.url);
  // response
  res.write('Welcome my app');
  // response according to url
  if (req.url == '/product') {
    return res.end('Welcome to Product Page');
  } else if (req.url == '/user') {
    return res.end('Welcome to User Page');
  }
  // default response
  res.end('Welcome to Nodejs Harshal Server');
});

// 3. Specify port to listen client's request
// server.listen(3100);
// console.log('Server is runnong on port 3100');

server.listen(3100, () => {
  console.log('Server is running on port 3100');
});
