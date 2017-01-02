var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var datahundle = require('./modules/datahundle')
var app = express();
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.post('/insert',function(req,res){
	var opt = req.body;
	datahundle.insertData(opt,function(){
		datahundle.getData(function(data){
			res.send(data);
		})
	})
})

app.post('/delete',function(req,res){
	var opt = req.body;
	datahundle.deleteData(opt,function(){
		datahundle.getData(function(data){
			res.send(data);
		})
	})
})

app.post('/update',function(req,res){
	var opt = req.body;
	datahundle.updateData({stuid:opt.stuid},opt,function(){
		datahundle.getData(function(data){
			res.send(data);
		})
	})
})

app.get('/',function(req,res){
	datahundle.getData(function(data){
		res.render('studentsList',{data:data})
	})
})

app.listen(3000,function(){
	console.log('server is running');
})