var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/mydb';


function getData(next){
	mongoClient.connect(url,function(err,db){
		db.collection('student').find().toArray(function(err,docs){
			next(docs);
			db.close();
		})
	})
}

function insertData(option,next){
	mongoClient.connect(url,function(err,db){
		db.collection('student').insertOne(option,function(){
			next();
			db.close();
		})
	})
}

function deleteData(option,next){
	mongoClient.connect(url,function(err,db){
		db.collection('student').deleteOne(option,function(){
			next();
			db.close();
		})
	})
}

function updateData(option,newOption,next){
	mongoClient.connect(url,function(err,db){
		db.collection('student').update(option,newOption,function(){
			next();
			db.close();
		})
	})
}

module.exports = {
	getData:getData,
	insertData:insertData,
	deleteData:deleteData,
	updateData:updateData
}