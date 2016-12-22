var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","jade");

app.get("/",function(req,res){
	res.render("home");
})

app.get("/hellojade",function(req,res){
	res.render("hellojade");
})

app.get("/extends",function(req,res){
	res.render("extends");
})

app.get("/mixins",function(req,res){
	res.render("mixins");
})

var news = [
	{title:"好消息",content:"javascript学习超简单"},
	{title:"好消息1",content:"javascript学习超简单1"},
	{title:"好消息2",content:"javascript学习超简单2"},
	{title:"好消息3",content:"javascript学习超简单3"},
	{title:"好消息4",content:"javascript学习超简单4"}
]

app.get("/data",function(req,res){
	res.render("data",{news:news});
})

var fruits = ["香蕉","苹果","鸭梨"];

app.get("/while",function(req,res){
	res.render("while",{fruits:fruits});
})

var login = {
	loginornot:false,
	permission:2	
}

app.get("/switch",function(req,res){
	res.render("switch",{data:login});
})

app.listen(3000,function(){
	console.log("服务器已经启动");
})