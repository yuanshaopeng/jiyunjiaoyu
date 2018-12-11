const http = require("http");
const url = require("url");
const querystring = require("querystring");

//创建服务
http.createServer((req,res)=>{
	
	let urlObj = url.parse(req.url);//路径解析
	//判断请求方式
	if(req.method.toLowerCase() == "get"){
		//get发送的数据
		let data = querystring.parse(urlObj.query);
		if(urlObj.pathname == "/api"){
			res.writeHead(200,{
				"content-type":"text/html;charset=utf-8",
				"Access-Control-Allow-Origin":"*"
			})
		}else if(urlObj.pathname == "/jsonp"){
			res.end(data.callback+"("+'数据'+")")
		}
	}else if(req.method.toLowerCase() == "post"){
		res.writeHead(200,{
			"content-type":"text/html;charset=utf-8",
			"Access-Control-Allow-Origin":"*"
		})
		//post数据
		let str = "";
		req.on("data",(data)=>{
			str+=data;
		})
		req.on("end",()=>{
			let data = querystring.parse(str);
			if(urlObj.pathname == "/api"){
				
			}
		})
	}
	
})
.listen(8080,()=>{
	console.log("run")
})

