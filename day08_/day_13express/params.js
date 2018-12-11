const express = require("express");//引入express框架
const http = express();//创建服务

http.listen(8080,()=>{
	console.log("run")
})

http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
})

//params传值
//  一般出现在访问店铺，访问商品详情时
//  /接口/:属性1/:属性2
http.get("/api/:name/:age",(req,res)=>{
	console.log(req.params);
	
	res.send("ok");
})

//
http.post("/api/:id",(req,res)=>{
	console.log(req.params);
	res.send("kok")
})
