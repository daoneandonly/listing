//requires
var http = require('http')
var mime = require('mime-types')
var fs = require('fs')
var path = require('path')

//createserver
http.createServer(onrequest).listen(8000)

//onrequest function that gets called on listen
function onrequest(req, res) {
  var route = req.url
  if (route === '/') {
    route = 'index.html'
  }
  fs.readFile(path.join('static', route), onread)

  function onread(err, buf){
    if (err){
      if (err.code === "EISDIR"){
        // HUIDIGE ROUTE = MAP
        // is there a index.html?
        fs.readdir(path.join('static', route), function(err, files){
          if (err) return res.end('error dir not found')
          if (files.includes('index.html')) {
            res.setHeader('Content-Type', mime.lookup(route))
            res.statusCode = 200
            fs.readFile(path.join('static', route, 'index.html'), function(err, buf){
              res.end(buf)
            })
          } else {
            //if not, print the array with files
            res.setHeader('Content-Type', 'text/html')
            res.statusCode = 200
            res.write('<h1> Index of ' + route + '</h1>')
            if (files == ""){
              res.write("<li>Directory is empty</li>")
            } else {
                res.write('<a href="..">back</a>')
                res.write('<ul>')
                files.forEach(function( files){
                res.write('<li>' + '<a href="' + route + '/' + files + '">' + files + '</a>' + '</li>')
            }) }
            res.write('</ul>')
            res.end()
          }
        })
      } else {
          // if route has not extension name, add .html and
          if (path.extname(route) === '') {
            route = route + ".html"
            res.statusCode = 200
            res.setHeader('Content-type', mime.lookup(route))
            res.end(buf)
        } else {
            // When page is not found give 404 + pagenotfound.html
            route = 'pagenotfound.html'
            res.statusCode = 404
            res.setHeader('Content-Type', mime.lookup(route))
            fs.readFile(path.join('static', route),
            function(err, buf){
              if (err) return res.end('404 page not found')
              res.end(buf)
            } )
        }
      }

    }
    else {
      //with no error give html
      res.statusCode = 200
      res.setHeader('Content-Type', mime.lookup(route))
      res.end(buf)
    }

  }

}
