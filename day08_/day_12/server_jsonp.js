//jsonp
/*
 * 只支持get请求
 * 要求后端提供callback参数  接收前端发送的函数名称   并返回函数调用语句
 */

const http = require("http");
const url = require("url");
const fs = require("fs");
const querystring = require("querystring");
http.createServer((req,res)=>{
	let urlObj = url.parse(req.url);
	if(req.method.toLowerCase()=="get"){
		if(urlObj.pathname == "/jsonp"){
			let data = querystring.parse(urlObj.query);
			let fnName = data.callback;
			fs.readFile("./data.json","utf-8",(err,data1)=>{
				res.end(fnName+"("+data1+")")
			})
		}
	}
})
.listen(8080,()=>{
	console.log("jsonp run")
})
