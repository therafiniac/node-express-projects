const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slug = dataObj.map((el) => slugify(el.productName, { lowe: true }));
console.log(slug);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const cardHtml = dataObj
      .map((el) => {
        return replaceTemplate(tempCard, el);
      })
      .join('');
    const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardHtml);
    res.end(output);

    // Product
  } else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);

    // Not Found
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
