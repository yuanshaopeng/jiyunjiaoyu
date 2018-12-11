const express = require("express");
const proxy = require("http-proxy-middleware");
const http = express();
//http://localhost:8080
http.listen(8080,function(){
	console.log("ProxyServer has run");
})

let config = {
	target:"https://api.avatardata.cn",
	changeOrigin:true,
}
http.get("/key",function(req,res){
	res.send({
		key:"3e3e909ade2e473c8d35372a75020cfd"
	})
})
http.use((req,res,next)=>{
	  res.header('Access-Control-Allow-Origin', '*');
	  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	  res.header('Access-Control-Allow-Methods', '*');
	  res.header('Content-Type', 'application/json;charset=utf-8');
	  next();
})
http.use("/",proxy(config));
