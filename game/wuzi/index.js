var http = require('http'),
    port = 8095,
    server = http.createServer(function(request, response){
        console.log('http.request');
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello World\n');
    });

server.listen(port);