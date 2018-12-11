//在引入nodeJs自带模块时   是没有文件夹的概念的   
//文件操作系统模块    调用本地服务的静态资源；
const fs = require("fs");//移入nodejs中的fs模块     //const声明   声明后值不能修改；

//文件的读取；    异步读取
//fs.readFile("./data.json","utf-8",(err,data)=>{
//	if (err) throw err;
//	console.log(data);
//})


//文件读取   同步方法
//var data = fs.readFileSync("./data.json","utf-8");
//console.log(data);
//console.log("黄河如海流");

//异步文件写入
//fs.writeFile(路径,写入的数据,{字符编码,写入方式},写入成功后的回调函数)
//fs.writeFile("./data.json",JSON.stringify("欲穷千里目，更上一层楼。"),{
//	encoding:"utf-8",//设置字符编码，
//	/*
//	 * flag: w 重写    a接着在后边写
//	 */
//	flag:"w"
//},function(err){
////	console.log(err);
//	if (err) throw err;
//	console.log("写入成功")
//})

//先读后写   更新数据；
//fs.readFile("./data.json","utf-8",function(err,data){
//	if (err) {
//		throw err;
//	}
//	//data:'[1,2,3,4,5]';
//	data = JSON.parse(data);//[1,2,3,4,5]
//	data.push(6);
//	fs.writeFile("./data.json",JSON.stringify(data),"utf-8",function(err){
//		if(err) throw err;
//	})
//})

//文件的重命名
//fs.rename("./data.json","./data2.json",function(err){
//	if (err) {
//		throw err;
//	}
//})

//读取某个文件夹下的目录
//fs.readdir("./modules",function(err,files){
//	if (err) throw err;
//	console.log(files)
//})

//创建文件夹
//fs.mkdir("./demo",function(err){
//	if (err) throw err;
//})

//删除文件夹   只能删除空文件夹
//fs.rmdir("./aaa",function(err){
//	if (err) throw err;
//})

