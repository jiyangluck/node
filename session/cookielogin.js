var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine','jade');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/login',function(req,res){
	res.render('login');
})

app.post('/checkuser',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	console.log(req.body);
	if(username === 'li' && password === 'aaa'){
		res.cookie('username',username,{maxAge:10000});
		res.redirect('/list');
	}else{
		res.send('登录失败');
	}
})

app.get('/list',function(req,res){
	var username = req.cookies.username;
	if(username){
		res.render('list',{data:username})
	}else{
		res.redirect('/login');
	}
})

app.get('/list2',function(req,res){
	var username = req.cookies.username;
	if(username){
		res.render('list2',{data:username})
	}else{
		res.redirect('/login');
	}
})

app.listen(3000,function(){
	console.log('server is running');
})