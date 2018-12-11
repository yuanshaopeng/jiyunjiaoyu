const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");
//cros  后台运行跨域访问Access-Control-Allow-Origin
http.createServer(function(req,res){
	//设置跨域访问    cros
	res.writeHead(200,{
		"content-type":"text/html;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
	})
	
	if(req.method.toLowerCase()=="get"){
		let urlObj = url.parse(req.url);
		//提交留言接口路径为/addbbs
		if(urlObj.pathname == "/addbbs"){
			let data = querystring.parse(urlObj.query);
			fs.readFile("./bbs.json","utf-8",(err,data1)=>{
				data1 = JSON.parse(data1);
				data1.push(data);
				fs.writeFile("./bbs.json",JSON.stringify(data1),"utf-8",(err)=>{
					res.end("写入成功")
				})
			})
		}else if(urlObj.pathname=="/bbs"){
			fs.readFile("./bbs.json","utf-8",(err,data1)=>{
				res.end(data1);
			})
		}
		
		
		
	}
	
})
.listen(8080,function(){
	console.log("get server")
})
