const ws = require("nodejs-websocket");//引入websocket依赖包,用以创建websocket服务;
//创建websocket服务
let count=0;
let server = ws.createServer(function(conn){
	count++;
	gb(""+count)
	//connection:连接者
	//只要与websocket建立连接,即可触发该回调函数;
	console.log("连接已建立");
	conn.sendText("ok")
//	text事件   用以监听前台发送的数据
	conn.on("text",function(str){
		console.log(typeof str);
//		conn.sendText("我收到了,你退下吧")
		gb(str);
	})
	conn.on("close",function(){
		//前台关闭了连接
		count--;
		gb(""+count)
	})
	conn.on("error",function(){
		//连接发生错误
	})
})
.listen(8080,"169.254.64.214")
console.log("server run")
function gb(value){
	server.connections.forEach((conn)=>{
		conn.sendText(value)
	})
}
