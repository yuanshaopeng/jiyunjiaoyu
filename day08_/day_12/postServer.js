const http = require("http");
const url = require("url");
const querystring = require("querystring");
http.createServer((req,res)=>{
	//cros跨域
	res.writeHead(200,{
		"content-type":"text/html;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
	})
	//post接口的设定
	if(req.method.toLowerCase()=="post"){
		/*
		 * post请求可能会存在有些用户会将发送的数据携带在路径中，故而仍使用url模块进行路径解析
		 */
		//判断接口地址   
		let urlObj = url.parse(req.url);
		if(urlObj.pathname == "/api"){
//			let data = querystring.parse(urlObj.query);
//			console.log(data);
			//post分段数据传输   通过data事件对传输的数据进行监听
			let str = "";//收集每段数据
			req.on("data",function(data){
				//每段数据传输成功时触发
				str+=data;
			})
			req.on("end",function(){
				//所有数据传输完毕后触发
				console.log(str);
				console.log(querystring.parse(str))
			})
		}
	}
})
.listen(8080,()=>{
	console.log("server is running")
})
