const ws = require("nodejs-websocket");//引入websocket依赖包,用以创建websocket服务;
const Db = require("./db.js");
const db = new Db("liaotianshi");
let count = 0;
//创建websocket服务
let server = ws.createServer(function(conn){
	count++;
	gb(JSON.stringify({
		status:"1",
		data:count
	}))
	db.find("list",{},function(err,data2){
		gb(JSON.stringify(data2))
	})
	conn.on("text",function(str){
		let data = JSON.parse(str);
		db.insertOne("list",data,function(){
			db.find("list",{},function(err,data2){
				gb(JSON.stringify({
					status:"2",
					data:data2
				}))
			})
		})
	})
	conn.on("close",function(){
		count--;
		gb(JSON.stringify({
			status:"1",
			data:count
		}))
	})
	conn.on("error",function(){
		//连接发生错误
	})
})
.listen(8080,"169.254.64.214")
function gb(value){
	server.connections.forEach((conn)=>{
		conn.sendText(value)
	})
}
