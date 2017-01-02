var express = require('express');
var app = express();

app.get('/index',function(req,res){
	res.setHeader('Set-Cookie','username=xiaoming');
	res.setHeader('Set-Cookie','age=123');
	res.send('小明')
})

app.get('/goods',function(req,res){
	console.log(req.headers.cookie)
	res.send('读取cookie');
})

app.listen(3000,function(){
	console.log('server is running');
})