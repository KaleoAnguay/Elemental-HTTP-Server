
const http = require('http');
const fs = require('fs');
const queryString = require('querystring');

const server = http.createServer((req,res) => {
  console.log(req.method);

  if( req.url === '/') {
    fs.readFile('./public/index.html', function(err , data) {

      res.end(data);
    });
  }

  if(req.url === '/css/styles.css'){
    fs.readFile('./public/css/styles.css', function(err, data) {
      res.end(data);
    });
  }

  if(req.url === '/hydrogen.html') {
    fs.readFile('./public/hydrogen.html', function(err, data) {
      res.end(data);
    });
  }

  if(req.url === '/helium.html') {
    fs.readFile('./public/helium.html', function(err, data) {
      console.log(err);
      res.end(data);
    });
  }

  if(req.method === 'POST') {
    if(req.url === '/elements') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', (data) => {
       const convert = queryString.parse(body);
       fs.writeFile(`${convert.elementName}.html`, 'Hello Node.js michael');
      });
    }
  }
});

server.listen(3000, () => {
  console.log( 'Server started on port 3000');
});