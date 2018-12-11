const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");
const code = require("./code.js");
//console.log(code["-1"])
function concatObj(obj1,obj2){
	for(let k in obj1){
		obj2[k] = obj1[k];
	}
	return JSON.stringify(obj2);
}
http.createServer((req,res)=>{
	res.writeHead(200,{
		"content-type":"text/html;charset=utf-8",
		"Access-Control-Allow-Origin":"*"
	})
	let urlObj = url.parse(req.url);
	if(req.method.toLowerCase() == "get"){
		let reqObj = querystring.parse(urlObj.query);//get请求数据
		//获取所有留言信息接口
		if(urlObj.pathname == "/bbs"){
			fs.readFile("./bbs.json","utf-8",(err,data)=>{
				if(err){
					res.end(concatObj(code["-1"],{data:null}))
				}else{
					res.end(concatObj(code["1"],{data:data}))
				}
			})
		}
		//获取一条数据留言
		else if(urlObj.pathname == "/onebbs"){
			fs.readFile("./bbs.json","utf-8",(err,data)=>{
				if(err){
					res.end(concatObj(code["-1"],{data:null}))
				}else{
					data = JSON.parse(data);//数据格式转换
					let resArr = data.filter((item,index)=>{
						if(item.id == reqObj.id){
							return true
						}else{
							return false
						}
					})
					if(resArr.length){
						res.end(concatObj(code["1"],{data:resArr[0]}))
					}else{
						res.end(concatObj(code["0"],{data:null}))
					}
				}
			})
		}
	}else if(req.method.toLowerCase()=="post"){
		let str = "";
		req.on("data",(data)=>{
			str+=data
		})
		req.on("end",()=>{
			let reqObj = querystring.parse(str);
			//提交留言
			if(urlObj.pathname == "/bbs"){
				reqObj.id = new Date().getTime();
				reqObj.time = new Date().getTime();
				fs.readFile("./bbs.json","utf-8",(err,data)=>{
					if(err){
						res.end(concatObj(code["-1"],{data:null}))
					}else{
						data = JSON.parse(data);
						data.push(reqObj);
						fs.writeFile("./bbs.json",JSON.stringify(data),"utf-8",(err)=>{
							if(err){
								res.end(concatObj(code["-2"],{data:null}))
							}else{
								res.end(concatObj(code["1"],{data:null}))
							}
						})
					}
				})
			}
			//删除一条数据
			else if(urlObj.pathname == "/delonebbs"){
				fs.readFile("./bbs.json","utf-8",(err,data)=>{
					if(err){
						res.end(concatObj(code["-1"],{data:null}))
					}else{
						data = JSON.parse(data);
						let arr = data.filter((item,index)=>{
							if(item.id == reqObj.id){
								return false
							}else{
								return true
							}
						})
						fs.writeFile("./bbs.json",JSON.stringify(arr),"utf-8",(err)=>{
							if(err){
								res.end(concatObj(code["-2"],{data:null}))
							}else{
								res.end(concatObj(code["1"],{data:null}))
							}
						})
					}
				})
			}
			//删除多条数据
			else if(urlObj.pathname == "/delmanybbs"){
				fs.readFile("./bbs.json","utf-8",(err,data)=>{
					if(err){
						res.end(concatObj(code["-1"],{data:null}))
					}else{
						data = JSON.parse(data);
						let delArr= reqObj.delArr;
						let arr = data.filter((item,index)=>{
							let index1 = delArr.indexOf(item.id);
							if(index1<0){
								return true
							}else{
								return false
							}
						})
						fs.wirteFile("./bbs.json",JSON.stringify(arr),"utf-8",(err)=>{
							if(err){
								res.end(concatObj(code["-2"],{data:null}))
							}else{
								res.end(concatObj(code["1"],{data:null}))
							}
						})
					}
				})
			}
			//删除所有数据
			else if(urlObj.pathname == "/delallbbs"){
				fs.wirteFile("./bbs.json",JSON.stringify([]),"utf-8",(err)=>{
					if(err){
						res.end(concatObj(code["-2"],{data:null}))
					}else{
						res.end(concatObj(code["1"],{data:null}))
					}
				})
			}
			//更新一条数据
			else if(urlObj.pathname == "/update"){
				fs.readFile("./bbs.json","utf-8",(err,data)=>{
					if(err){
						res.end(concatObj(code["-1"],{data:null}))
					}else{
						data = JSON.parse(data);
						data.forEach((item,index)=>{
							console.log(item.id,reqObj.id)
							if(item.id == reqObj.id){
								item.title = reqObj.title;
								item.content = reqObj.content;
								console.log(item);
							}
						})
						fs.writeFile("./bbs.json",JSON.stringify(data),"utf-8",(err)=>{
							if(err){
								res.end(concatObj(code["-2"],{data:null}))
							}else{
								res.end(concatObj(code["1"],{data:null}))
							}
						})
					}
				})
			}
		})
	}else{
		res.end("请求方式有误，请确认")
	}
})
.listen(8080,()=>{
	console.log("bbsRun")
})
