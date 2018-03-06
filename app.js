var http = require('http')
var mime = require('mime-types')
var fs = require('fs')
var path = require('path')

http.createServer(onrequest).listen(8000)

function onrequest(req, res) {
var route = req.url
if (route === '/') {
  route = 'index.html'
}
  fs.readFile(path.join('static', route), onread)

  function onread(err, buf){
    if (err){
      route = 'pagenotfound.html'
      res.statusCode = 404
      res.setHeader('Content-Type', mime.lookup(route))

      fs.readFile(path.join('static', route), function(err, buf){
        if (err) return res.end('404 page not found')
        res.end(buf)
      } )
    }
    else {
      res.statusCode = 200
      res.setHeader('Content-Type', mime.lookup(route))
      res.end(buf)
    }

  }

}
