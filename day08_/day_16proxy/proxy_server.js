const express = require("express");
const http = express();
const proxy = require("http-proxy-middleware");//反向代理依赖包
http.listen(8081,function(){
	console.log("power 8081")
});

http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next()
})
//可以通过路由进行服务请求转发
let config = {
	target:"https://api.avatardata.cn",//转发的服务器地址
	changeOrigin:true,//建立虚拟站点
}
//
http.use("/ZhouGongJieMeng/LookUp",proxy(config));
let config2 = {
	target:"http://localhost:8080",//转发的服务器地址
	changeOrigin:true,//建立虚拟站点
}
http.use("/",proxy(config2));
