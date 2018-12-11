const http = require("http");//创建http服务器模块；
const url = require("url");//路径解析模块
const querystring = require("querystring");//数据字符串解析模块
//创建服务器    http://localhost:8080;
http.createServer(function(req,res){
	//当用户在客户端访问服务器时  触发该回调函数
	console.log("run")
//	req  前台对象
//  res  后台对象
	
	//url属性   method属性
	console.log(req.url) 
	console.log(req.method);
	let urlObj = url.parse(req.url);//
	console.log(querystring.parse(urlObj.query));
//	{
//		pathname:"/api",
//		query:username=lee&password=123
//	}
	/*
	 * req.url:/api?username=lee&password=123  访问的地址路径（不包括服务器地址）
	 * {
	 * 		path:接口名称
	 * 		query:数据
	 * }
	 * req.method: 请求方式
	 */
//	let arr = req.url.split("?");
//	let obj = {
//		path:arr[0],
//		query:arr[1]
//	}
	
	
})
.listen(8080,()=>{
	console.log("server is running")
})
