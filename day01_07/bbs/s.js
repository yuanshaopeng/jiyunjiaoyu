const express = require("express");
const http = express();
const server = require('http').createServer(http)
const io = require("socket.io").listen(server);
server.listen(8080,()=>{
	console.log("server run ")
})
let chatArr = [];
http.use(express.static("./public"));
io.on('connection', function(socket) {
    //接收并处理客户端发送的foo事件
    socket.on('chat', function(data) {
        //将消息输出到控制台
        console.log(data);
		chatArr.push(data);
		io.sockets.emit("send",chatArr);
    })
});