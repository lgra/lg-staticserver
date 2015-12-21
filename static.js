var http = require('http')
var fs = require('fs')
var path = require('path')
var port = 8081

var ext2contentType = {
    'js': 'text/javascript',
    'css': 'text/css',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'wav': 'audio/wav'
}

var root = './www'

var ws = http.createServer(function (request, response) {
	var filePath = request.url
	if (filePath == '/') {
		filePath = '/index.html'
	}
	filePath = root + filePath
	var extname = path.extname(filePath).slice(1)
	var contentType = ext2contentType[extname]
	fs.readFile(filePath, function(error, content) {
		if (error) {
			if(error.code == 'ENOENT') {
				fs.readFile('./404.html', function(error, content) {
					response.writeHead(200, { 'Content-Type': contentType })
					response.end(content, 'utf-8')
				})
			}
			else {
				response.writeHead(500)
				response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
				response.end()
			}
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType })
			response.end(content, 'utf-8')
		}
	})
})

ws.listen(port, '127.0.0.1')
ws.on('close', function() { })

console.log('Server running at http://127.0.0.1:' + port + '/')