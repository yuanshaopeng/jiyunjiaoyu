const md5 = require("js-md5");
const dbPlugin = require("./db.js");
const db = new dbPlugin("bBox");
const jwt = require("./jwt.js");
module.exports = {
	//验证用户和手机重复接口
	_yz(req,res){
		let data = req.query;
		if(data.tel){
			db.count("userList",{tel:data.tel},(err,count)=>{
				if(count==0){
					res.send({
						status:"1",
						statusText:"ok"
					})
				}else{
					res.send({
						status:"-1",
						statusText:"手机号已存在"
					})
				}
			})
		}else if(data.username){
			db.count("userList",{username:data.username},(err,count)=>{
				if(count==0){
					res.send({
						status:"1",
						statusText:"ok"
					})
				}else{
					res.send({
						status:"-2",
						statusText:"用户名已存在"
					})
				}
			})
		}else{
			//服务器对前端的响应码
			res.send({
				status:"-3",
				statusText:"发送数据有误"
			})
		}
	},
	//注册接口
	//用户密码是不能以不加密的形式储存在任何位置
	//后台也不会把用户密码返给前台
	_zhuce(req,res){
		let data = req.body;
		if(data.username && data.tel && data.password){
			data.password = md5(data.password);
			db.insertOne("userList",data,(err,data)=>{
				if(err) throw err;
				res.send({
					status:"1",
					statusText:"注册成功",
					url:"http://localhost:8080/html/login.html"
				});
			})
		}else{
			res.status(400)
		}
	},
	//登陆回调
	_login(req,res){
		var data = req.body;
		if(data.username){
			db.find("userList",{query:{username:data.username,password:md5(data.password)}},(err,userData)=>{
				if(userData.length >0){
					let user = userData[0];
					res.send({
						status:"1",
						statusText:"ok",
						data:{
							id:user._id,
							username:user.username,
							tokenID:jwt.getToken({id:user._id},"7d")
						}
					})
				}else{
					res.status(400);
					res.send("登陆错误")
				}
			})
		}else{
			db.find("userList",{query:{tel:data.tel,password:md5(data.password)}},(err,userData)=>{
				console.log(userData)
				if(userData.length >0){
					let user = userData[0];
					res.send({
						status:"1",
						statusText:"ok",
						data:{
							id:user._id,
							username:user.username,
							tokenID:jwt.getToken({id:user._id},"7d")
						}
					})
				}else{
					res.status(400);
					res.send("登陆错误")
				}
			})
		}
	}
}
