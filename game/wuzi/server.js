var WebSocket = require('faye-websocket'), 
	http = require('http'),
	port = 8095,
	server = http.createServer(function(request, response) {
	});

var players = [], isBlack;
server.on('upgrade', function(request, socket, body) {
	if (WebSocket.isWebSocket(request)) {
		var ws = new WebSocket(request, socket, body);
		ws.on('message', function(da) {
			var data = da.data;
			var sendDate = {};
			switch(data.type){
				case 'click':
					break;
				case 'name':
					players.push({
						name: data.name
					});
					sendData = {
						type: 'name',
						data: players.join(',')
					}
					break;
			}
			ws.send(sendData);
		});
		ws.on('close', function(e) {
			console.log('close', e.code, e.reason);
			ws = null;
		});
	}
});
server.listen(port); 
console.log('server start with : ' + port);