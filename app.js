var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
	res.send('index');
});
app.use('/findingfriends', require('./findingfriends'));
app.listen(process.env.PORT,process.env.IP,function(){});
