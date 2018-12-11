const express = require("express");
const ejs = require("ejs");//后端模板引擎；
const http = express();
const fs = require('fs');
http.listen(6500,()=>{
	console.log("power:6500 run")
})
localhost:6500
http.get("/",(req,res)=>{
//	fs.
//	res.send("")
	fs.readFile("./html/shop.html","utf-8",(err,data)=>{
		fs.readFile("./ejs.json","utf-8",(err,data1)=>{
			data1 = JSON.parse(data1);
			let dom = ejs.render(data,{arr:data1})
			res.send(dom);
		})
	})
})

http.get("/item/:id",(req,res)=>{
	let id = req.params.id;
	fs.readFile("./html/item.html","utf-8",(err,data)=>{
		fs.readFile("./ejs.json","utf-8",(err,data1)=>{
			data1 = JSON.parse(data1);
			let obj = {};
			for(let i = 0 ; i < data1.length ; i++){
				if(data1[i].id == id){
					obj = data1[i];
					break;
				}
			}
			
			res.send(ejs.render(data,obj));
		})
	})
})
