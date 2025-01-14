const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  } else if (pathName === '/api') {
    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);
    });
    res.end('API');
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'Hello World',
    });
    res.end('<h1>Page Not Found</h1>');
  }
  res.end('hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is listening on port:8000');
});