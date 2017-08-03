require('babel-core/register');
var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
	res.render('index');
	//res.sendFile(__dirname + '/views/hello.html');
});
app.use('/findingfriends', require('./findingfriends'));
app.listen(process.env.PORT,process.env.IP,function(){});
