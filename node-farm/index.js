const { log } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is PRODUCT');
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
    res.end('<h1>Pages Note Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is listening on port:8000');
});
