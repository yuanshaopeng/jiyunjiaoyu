//const fs = require('fs');
////fs.writeFile("./data.json","白日依山尽","utf-8",(err)=>{
////	console.log("ok")
////})
//
////json数据  写入时应遵循   先读后写；
//fs.readFile("./data.json","utf-8",(err,data)=>{
//	console.log(data);
//	data = JSON.parse(data);
//	data.push("黄河入海流")
//	fs.writeFile("./data.json",JSON.stringify(data),"utf-8",(err)=>{
//		console.log("ok")
//	})
//})

const fs = require("./myFs.js");
fs.readFile("./data2.json")
.then(res=>{
	console.log(res);
})
