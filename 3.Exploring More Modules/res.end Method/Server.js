const http = require('http');

const server = http.createServer((req, res) => {
  res.write('This is coming from Nodejs Server\n');
  console.log(req.url);
  if (req.url == '/first') {
    return res.end('This is first response');
  } else {
    res.end('This default response');
  }
});

server.listen(3200, () => {
  console.log('Server is listening at 3200');
});
