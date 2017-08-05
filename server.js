var express = require('express')
var app = express();
var server = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 3000;
const config = require('./server.config.js');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, config.publicPath, '/index.html'));
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});

app.use(express.static(path.join(__dirname, config.publicPath)));
