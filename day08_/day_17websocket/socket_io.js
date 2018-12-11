const express = require("express");
const app = express();
const socket_io = require("socket.io");//将socket服务融合到http服务内;
const http = require("http");//node中的http模块;
const server = http.createServer(app);//
const io = socket_io.listen(server);//融合到http服务中的socket服务;
/*
 * socket.io 通讯原理
 * 通过前后设定统一的自定义事件,进行数据的交互;
 */
//托管www文件夹;
app.use(express.static("./www"));

//websocket业务;
io.on("connection",function(conn){
	//当连接到服务就会触发;
	console.log("new Person connect");
	
	
//	emit()创建自定义事件;
//	emit("eventName",{name:"xxx"})

//	on("自定义事件名称",function(data){
//		
//	})
//	后台创建了自定义事件 chat   用于后台向前台发送数据;
	
	conn.emit("chat","累好");
	conn.on("toserver",function(data){
		console.log(data);
//		conn.emit("ss","我收到了");
		//广播所有用户;
		io.sockets.emit("send","有人和我聊天了");
	})
})
server.listen(8080,"169.254.64.214");
