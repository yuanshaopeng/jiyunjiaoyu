const express = require("express");
const bodyParser = require("body-parser");//用来获取解析post请求发送的数据；
const http = express();//返回http服务对象
http.listen(8080,()=>{
	console.log("run")
})
//use中间件  在进入对应的接口之前先走一遍use中间件
http.use((req,res,next)=>{
	//cors跨域
	res.header("Access-Control-Allow-Origin","*");
	next();//是否继续运行
})
//bodyParser的使用放在所有中间件之后运行
http.use(bodyParser.urlencoded({extended:false}));//获取解析post请求发送的数据；

http.get("/bbs",(req,res)=>{
	//当前端访问的服务器通过get请求访问/bbs接口时触发；
	console.log(req.query);
//	req.query=>前端get请求发送的数据对象
	res.send({status:"1",statusText:"ok"})
})

http.post("/api",(req,res)=>{
	console.log(req.body);
//	req.body=>前端post请求发送的数据
	res.send("ol")
})
