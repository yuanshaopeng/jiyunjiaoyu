var http = require("http");//搭建服务器；
var url = require("url");//请求路径的解析模块；
var querystring = require("querystring");//字符串解析模块；
var fs = require("fs");//文档操作系统模块
http.createServer(function(req,res){
	//跨域访问方式一：cros跨域；由后台运行跨域访问；
	res.writeHead(200,{
		"content-type":"text/html;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
	})
	
	//在用户访问服务器时运行；
	
	//req  request  前台信息对象
	
	//res  response 后台响应对象
	
	// 在req中具备以下两个属性
// 	method：返回用户访问服务器时的请求方式
// 	url：返回用户访问服务器时的路径，包含接口路径以及携带数据；
	//req.url    /api?name=lee&pass=123;
	var urlObj = url.parse(req.url);
	//urlObj = {pathname:"/api",query:name=lee&pass=123}
	if(req.method.toLowerCase() == "get"){
		var dataObj = querystring.parse(urlObj.query);
		//dataObj = {name:lee,pass:123}
		console.log(dataObj);
		if(urlObj.pathname == "/api"){
			if(dataObj.name === "lee" && dataObj.pass == "123"){
				res.end("login success");
			}else{
				res.end("login error");
			}
		}else if(urlObj.pathname == "/getFile"){
			fs.readFile("./data.json","utf-8",function(err,data){
				if(err){
					res.end(err);
				}else{
					res.end(data);
				}
			})
		}
	}else{
		if(urlObj.pathname == "/postreq"){
			let str = ""
			res.on("data",function(data){
				str+= data
			})
			res.on("end",function(){
				let data = querystring.parse(str);
				res.end(JSON.stringify(data));
			})
		}
	}
	
})
.listen(8080,function(){
	console.log("已启动")
})