var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var links = require('./routes/links')

var PORT = 8888

var Links = require('./model/Links')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

app.use('/links', links)

app.get('/:hash([a-zA-Z0-9]{6})', function(req, res) {
	var link = Links.get(req.params.hash)
	if (link) {
		res.redirect(link.url)
	} else {
		res.status(404)
		res.send("Sorry, this link is not in our database.")
	}
})

app.get('*', function(req, res){
	res.status(404)
   res.send('Sorry, this is an invalid URL.')
})

app.listen(PORT, function() {
	console.info("Server is listening on port " + PORT + ".")
})

module.exports = app
