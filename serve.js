var http = require('http');
var fs = require('fs');
http.createServer(function(request, response) {
	response.writeHead(200);
	var newFile = fs.createWriteStream("readme_copy.md");
	request.pipe(newFile);
	request.on("end", function(){
		response.end();
	});
}).listen(8080);