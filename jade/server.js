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

var newsData = [
	{
		"title":"微信小程序",
		"text":"学习开发微信小程序！学习开发微信小程序！学习开发微信小程序！"
	},
	{
		"title":"学习javascript",
		"text":"学习javascript！学习javascript！学习javascript！学习javascript！"
	},
	{
		"title":"学习html",
		"text":"学习html！学习html！学习html！学习html！学习html！学习html！"
	},
	{
		"title":"学习node",
		"text":"学习node！学习node！学习node！学习node！学习node！学习node！"
	},
	{
		"title":"学习css",
		"text":"学习css！学习css！学习css！学习css！学习css！学习css！学习css！"
	},
]



app.get("/newslist",function(req,res){
	res.render("newslist",{data:newsData});
})

app.get("/news/:pageid",function(req,res){
	res.render("news",{data:newsData[req.params.pageid]});
})

app.listen(3000,function(){
	console.log("服务器已经启动");
})