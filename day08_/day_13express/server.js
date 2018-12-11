const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");

http.createServer((req,res)=>{
	//跨域
	res.writeHead(200,{
		"content-type":"text/html;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
	})
	//路径解析
	let urlObj = url.parse(req.url);
	//判断请求方式
	if(req.method.toLowerCase() == "get"){
		let reqObj = querystring.parse(urlObj.query);//get
		if(urlObj.pathname == "/msg"){
			fs.readFile("./data.json","utf-8",(err,data)=>{
				if(err) throw err;
				res.end(data)
			})
		}else if(urlObj.pathname == "/del"){
			let id = reqObj.id;
			fs.readFile("./data.json","utf-8",(err,data)=>{
				if(err) throw err;
				data = JSON.parse(data);
				for(var i = 0 ; i < data.length ; i++){
					if(data[i].id == id){
						data.splice(i,1);
						break;
					}
				}
				fs.writeFile("./data.json",JSON.stringify(data),'utf-8',(err)=>{
					if(err) throw err;
					res.end("删除成功")
				})
			})
		}
	}else{
		let str = ''
		req.on("data",(data)=>{
			str+=data;
		})
		req.on("end",()=>{
			let reqObj = querystring.parse(str)//post
			if(urlObj.pathname == "/add"){
				reqObj.id = new Date().getTime();
				fs.readFile("./data.json","utf-8",(err,data)=>{
					if(err) throw err;
					data = JSON.parse(data);
					data.push(reqObj);
					fs.writeFile("./data.json",JSON.stringify(data),"utf-8",(err)=>{
						if(err) throw err;
						res.end("ok")
					})
				})
			}
		})
	}
})
.listen(8080,()=>{
	console.log("run")
})
