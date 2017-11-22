var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(
    200,
    {
      'Content-Type': 'text/plain'
    }
  );

  res.end('Hello World\n');
  
}).listen(3333);
console.log('Server running on port 3333.');
