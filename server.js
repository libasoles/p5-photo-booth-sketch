var express = require('express')
var app = express();
var server = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 3000;

const PUBLIC_FOLDER = __dirname + "/public";

app.get('/', function (req, res) {
  res.sendFile(path.join(PUBLIC_FOLDER + '/index.html'));
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});

app.use(express.static(PUBLIC_FOLDER));
