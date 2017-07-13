var express = require('express');
var app = express();

app.get('/findingfriends', require('./findingfriends');
app.get('/', function(req,res){
	res.render('index');
});

app.listen(3000,function(){});
