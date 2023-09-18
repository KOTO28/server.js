const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer();

server.on('request', function(request, response) {
	fs.readFile(__dirname + '/pages/'+request.url, 'utf-8', function(err, data){
		if (err){
			fs.readFile(__dirname + '/pages/404.html','utf-8',function(err2,data2){
				if(err2){
					response.writeHead(404, {'Content-Type': 'text/plain'});
					response.write('Page Not Found!');
					return response.end();
				}
				response.writeHead(404, {'Content-Type': 'text/html'});
				response.write(data2);
				return response.end();
			});
		}else{
			const json = JSON.parse(fs.readFileSync(__dirname+"/data.json",'utf-8'));
			let kai = true;
			var keys = Object.keys(json);
			for (var i=0; i < keys.length; i++){
				if(request.url.includes("."+keys[i])&& kai){
					response.writeHead(200,{'Content-Type': json[keys[i]]});
					kai = false;
				}
			}
			if (kai){
				console.log("text/plain")
			}
			response.write(data);
			response.end();
		}
	});
});

server.listen(port, hostname, function() {//サーバ起動時に呼ばれる
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`http://${hostname}:${port}/test.html`);
});
