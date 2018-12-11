const express = require("express");
const http = express();
const adminRouter = require("./router/admin_router.js");

http.listen(8080,()=>{
	console.log("run")
})

http.use("/admin",adminRouter);
//静态资源托管  托管项目首页
http.use(express.static("./public"))

//all  所有请求方式    托管其他（上传）文件   写在服务器脚本最下边
http.all("*",function(req,res){
	//__dirname:服务器的根目录
	console.log(__dirname);
	//sendFile 发送文件
	res.sendFile(__dirname+req.url);
})
