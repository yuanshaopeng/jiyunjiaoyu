const express = require("express");
const http = express();
http.listen(8081,"169.254.64.214")
http.use(express.static("./public"));
const Db = require("./db.js");
const db = new Db("liaotianshi");
const md5 = require("js-md5");
http.get("/zc",function(req,res){
	let data = req.query;
	data.password = md5(data.password);
	db.insertOne("userList",data,function(){
		res.send("ok")
	})
})

http.get("/login",function(req,res){
	let data = req.query;
	data.password = md5(data.password);
	db.find("userList",{query:data},function(err,userdata){
		if(userdata.length ==0){
			res.send("查无此人")
		}else{
			delete userdata[0].password;
			res.send({
				userMsg:userdata[0],
				wsUrl:"ws://169.254.64.214:8080"
			})
		}
	})
})