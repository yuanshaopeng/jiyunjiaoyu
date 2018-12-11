const http = require("http");
const url = require("url");
const querystring = require("querystring");
//cros  后台运行跨域访问Access-Control-Allow-Origin
http.createServer(function(req,res){
	//设置跨域访问    cros
	res.writeHead(200,{
		"content-type":"text/html;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
	})
	//第一步：通过req.method请求方式的判定
	if(req.method.toLowerCase() == "get"){
		//解析接口路径
		let urlObj = url.parse(req.url); 
//		{
//			pathname:"/api",
//			query:"username=lee&password=123"
//		}
		//判断访问服务器的接口是否为规定的接口
		if(urlObj.pathname == "/api"){
			//数据格式解析
			let data = querystring.parse(urlObj.query);
//			{
//				username:"lee",
//				password:"123"
//			}
			//完成业务逻辑
			if(data.username =="lee"&&data.password == "123"){
				//完成响应
				res.end("success1");
			}else{
				//完成相应
				res.end("error");
			}
		}
	}
})
.listen(8080,function(){
	console.log("get server")
})
