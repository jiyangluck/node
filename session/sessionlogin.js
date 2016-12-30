var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine','jade');
app.use(session({
	secret:"hello",
	rolling:true,
	cookie:{
		maxAge:10000
	}
}));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/login',function(req,res){
	res.render('login');
})

app.post('/checkuser',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if(username === 'li' && password === 'aaa'){
		req.session.username = username;
		res.redirect('/list');
	}else{
		res.send('登录失败');
	}
})

app.get('/list',function(req,res){
	req.session.touch();
	var username = req.session.username;
	if(username){
		res.render('list',{data:username})
	}else{
		res.redirect('/login');
	}
})

app.get('/list2',function(req,res){
	req.session.touch();
	var username = req.session.username;
	if(username){
		res.render('list2',{data:username})
	}else{
		res.redirect('/login');
	}
})

app.listen(3000,function(){
	console.log('server is running');
})