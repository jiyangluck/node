var express = require('express');
//创建路由模块
var index = express.Router();
var news = express.Router();



index.get('/',function(req,res){
	res.send('home');
})


news.get('/',function(req,res){
	res.send('user');
})


//加载路由模块
var app = express();
app.use('/',index);
app.use('/user',news);
app.listen(3000,function(){
	console.log("server is running");
})