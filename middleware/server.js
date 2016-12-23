var express = require('express');
var app = express();

// function fun(a,b,next){
// 	next(a+b);
// }

//use方法可以实现：在处理请求之前，用req和res对象实现一些自定义功能。
app.use(function(req,res){
	res.send('hello node');
});

app.listen(3000,function(){
	console.log('server is running');
})