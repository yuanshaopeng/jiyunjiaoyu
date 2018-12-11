const express = require("express");
//const formidable = require("formidable");//用来获取表单数据的对象；
const http = express();
//const fs = require("fs");
const upload = require("./modules/upload_pic.js");
http.listen(8080,()=>{
	console.log("run!")
})
http.use(express.static("./public"))
//文件上传
//文件上传只能通过post请求发送；
http.post("/upload",(req,res)=>{
	upload._upload(req,function(err,data){
		
		/*
		 * data:{
		 * 	url:图片的服务器地址
		 * 	name:图片名称
		 *  ext:图片格式
		 *  size:图片大小
		 *  opt:上传文件时的额外数据
		 * }
		 * 
		 * {
		 * 	err:{
		 * 	 -1：文件格式有误
		 *   -2：文件重复
		 *   -3：大小超限  2m
		 *   -4：发送文件名称标识有误
		 * 	 -5：删除错误
		 *   -6：重命名错误
		 * }
		 * }
		 */
		if(err){
			res.send(err);
		}else{
			res.send(data);
		}
	})
})
http.all("*",function(req,res){
	res.sendFile(__dirname+req.url);
})
