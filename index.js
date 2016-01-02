var http = require('http'),
	util = require('util'),
	port = 8080,
	nstatic = require('node-static'),
	file = new (nstatic.Server)('./', {
		cache: 7200
	}),
	child_process = require('child_process'),
	time_out = 20000,
	fs = require('fs'),
	server = http.createServer(function(request, response){
		var url = request.url,
			is_get = request.method === 'GET',
			trunk = '';
		request.addListener('data', function(d) {trunk += d;});
		request.addListener('end', function() {
			console.log(url);
			if (/^\/forward.jsp/.test(url)) {
				response.writeHead(200);
				var str = fs.readFileSync('./index.html', {
					encoding: "utf8"
				});
				response.write(str);
				response.end();
				// response.writeHead(301, {  
					// 'Location': 'http://' + get_local_ip() + '/index_dev.html' + url.replace(/^\/forward.jsp/, '') + '&randomTime=' + (+ new Date())
				// }); 
				return;
			}
			//我们专门针对mock请求来做数据的派发
			if (/^\/(mock_ajax|post_data)/.test(url)) {
				try {
					var params = get_params(url, trunk),
						api_name = url.split('/')[2],
						is_mock_ajax = /^\/mock_ajax/.test(url),
						fork = child_process.fork('./' + (is_mock_ajax ? 'index_fork' : 'index_receive_data') + '.js'),
						timeout_handler;
					fork.on('message', function(data) {
						clearTimeout(timeout_handler);
						fork.kill();
						switch(data.act_type) {
							case 'ended':
								response.writeHead(200);
								response.end();
								break;
							case 'loaded':
								response.writeHead(200);
								response.write(data.act_value || '');
								response.end();
								break;
							case 'error':
								func_error(response, 'error', params);
						}
					});
					timeout_handler = setTimeout(function() {
						func_error(response, 'timeout', params);
						fork.kill();
					}, time_out);
					fork.send({
						api_name: api_name,
						params: params
					});
				} catch(e) {
					func_error(response, 'error', params, '未知错误');
				}
			} else {
				//静态文件
				if (/(_v[^.]*)\.js$/.test(url)) {
					var rp = RegExp.$1;
					url = url.replace(rp, '');
					if (/^\/bootstrap/.test(url)) {
						url = url.replace('bootstrap', 'bootstrap_v1');
					}
					request.url = url;
				}
				file.serve(request, response, function(err, res){
					if (err) {
						//util.error("> Error serving " + request.url + " - " + err.message);
						response.writeHead(err.status, err.headers);
						response.end();
					} else {}
				});
			}
		});
	}),
	fs = require('fs');

function get_params(url, trunk) {
	var params = {}, i;
	if (/\?/.test(url)) {
		var s_get = url.slice(url.lastIndexOf('?') + 1, url.length),
			p_get = get_split_param(s_get);
		for (i in p_get) {
			params[i] = p_get[i];
		}
	}
	if (trunk !== undefined) {
		var p_post = get_split_param(trunk);
		for (i in p_post) {
			params[i] = p_post[i];
		}
	}
	return params;
}

function get_split_param(url) {
	var i = 0, urls = url.split('&'), ni = urls.length, rd = {}, it;
	if (ni === 0) {
		return rd;
	}
	for (; i < ni; i++) {
		it = urls[i].split('=');
		rd[it[0]] = decodeURIComponent(it[1]);
	}
	return rd;
}
function func_error(res, tp, params, message) {
	var json = {};
	if (params.api_name) {
		json.api_name = params.api_name;
		json.message = message || '';
		json.result = 200;
		json.data = {};
		//来自rc 的需求
	} else {
		//模拟数据需求
		if (tp === 'timeout') {
			json = 'timeout';
		} else {
			tp.error_response = 'error';
		}
	}
	res.writeHead(200);
	res.write(typeof json === 'object' ? JSON.stringify(json) :  json);
	res.end();
}
server.listen(port); 
console.log('sys running');
