const express = require("express");
const mongodb = require("mongodb");//连接mogondb数据库
const url = "mongodb://localhost:27017";
const MongoClient = mongodb.MongoClient;//连接
const http = express();

http.listen(8080,()=>{
	console.log("run");
})
http.get('/cs',(req,res)=>{
	let data = req.query;
	//数据库连接语法
	MongoClient.connect(url,(err,db)=>{
		if(err){
			console.log(err);
		}else{
			console.log("数据库连接成功");
			//进入要操作的数据库  db.db("数据库名称")
			let dbase = db.db("demo");//dbase  demo数据库对象；
			//指定集合操作
			dbase.collection("list")
			//操作
//			.insertOne({},回调函数)
//			.insertMany([],回调函数)
//			.deleteOne({},回调函数)
//			.deleteMany({},回调函数)
//			.updateOne({},{$set:{}},回调函数)
//			.updateMany({},{$set:{}},回调函数)
//			.find({},回调函数)
		}
	})

})
