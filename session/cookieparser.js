var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

app.get('/index',function(req,res){
	res.cookie('isVisit',1,{maxAge:10000});
	res.send('写入cookie');
})

app.get('/goods',function(req,res){
	if(req.cookies.isVisit){
		res.send('已登录');
	}else{
		res.send('未登录');
	}
})

app.listen(3000,function(){
	console.log('server is running');
})