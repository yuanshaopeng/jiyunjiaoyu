//fs模块     文档操作模块    可以操作当前脚本所在文件夹内部文件
//引入的模块是nodeJs中带有的模块    导入时直接写模块名称即可；
const fs = require("fs");

//读取文件内容方法 
fs.readFile("./data.json","utf-8",(err,data)=>{
	console.log(typeof data);  //data  JSON字符串
})

//写入文件方法
//fs.writeFile("./data.json","写入内容","utf-8",(err)=>{
//	console.log("写入成功")
//})

//fs.writeFile("./data.txt","登鹳雀楼  袁少鹏\n","utf-8",(err)=>{
//	console.log("ok");
//	fs.writeFile("./data.txt","白日依山尽\n",{
//		encode:"utf-8",
//		flag:"a"
//	},(err)=>{
//		console.log("ok");
//		fs.writeFile("./data.txt","黄河入海流\n",{
//			encode:"utf-8",
//			flag:"a"
//		},(err)=>{
//			console.log("ok");
//		})
//	})
//})

//删除文件    
//fs.unlink("./data.txt",(err)=>{
//	console.log("ok")
//})


//重命名文件
//fs.rename("./data.json","./data2.json",(err)=>{
//	console.log("ok")
//})


//创建文件夹
//fs.mkdir("./upload",(err)=>{
//	console.log("ok")
//})

//删除空文件夹
//fs.rmdir("./upload",(err)=>{
//	console.log("ok")
//})

//读取目录结构
//fs.readdir("./",(err,data)=>{
//	console.log(err,data);  //返回目录数组
//})

//也提供了同步操作方法
//fs.readFileSync()
