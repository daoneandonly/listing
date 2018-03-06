var mime = require('mime-types')
var http = require('http')
var fs = require('fs')
var path = require('path')

var routes = {'/about': 'This is my website\n',
'/': 'Hello World\n'}

http.createServer(onrequest).listen(8000)

function onrequest(req, res){
  var route = req.url
  if (route === '/') {
    route = 'index.html'
  }

  fs.readFile(path.join('static', route), onread)

  function onread(err, buf){
    if (err) {
    res.statusCode = 404
    res.end('Page not found')
    } else {
    res.statusCode = 200
    res.setHeader('Content-Type', mime.lookup(route))
    res.end(buf)
    }
  }

}
