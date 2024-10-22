import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  if (req.method == 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.appendFileSync('./data.txt', body);
      console.log(fs.readFileSync('data.txt', { encoding: 'utf-8' }));
    });
    res.end('Data received');
  }
});

export default server;
