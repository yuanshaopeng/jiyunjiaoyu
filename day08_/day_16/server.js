const express = require("express");
const dbPlugin = require("./db.js");
const db = new dbPlugin("shop08");
const md5 = require("js-md5");
const jwt = require("./jwt.js");
const bodyParser = require("body-parser");
const http = express();
http.listen(8080,()=>{
	console.log("run")
})
http.use(express.static("./public"))
http.use(bodyParser.urlencoded({extended:false}));
//登陆接口
http.post("/login",(req,res)=>{
	db.find("userList",{query:{
		username:"lee",
		password:md5("123")
	}},(err,data)=>{
		let user = data[0];
		res.send({
			userID:user._id,
			username:user.username,
			tokenID:jwt.getToken({id:user._id},"7d")
		})
	})
})

http.get("/goods",(req,res)=>{
	db.find("goodsList",{query:{}},(err,data)=>{
		res.send({
			status:"1",
			statusText:"ok",
			data:data
		})
	})
})

/*
 * userID
 * tokenID,
 * goodsID,
 * num 购买数量
 */

/*
 * 购物车集合数据库文档
 * _id:
 * userID:用户id
 * goodsID:商品id
 * num:购买数量
 */
http.post("/add",(req,res)=>{
	let data1 = req.body;
	//验证用户身份的合法性
	jwt.setToken(data1.tokenID,(err,data2)=>{
		if(err){
			res.status(401)
			res.send()
		}else{
			if(data1.userID == data2.id){
				//验证用户购买的商品是否重复购买
				db.count("carList",{userID:data1.userID,goodsID:data1.goodsID},(err,count)=>{
					if(count>0){
						//已购买    在原有购买数量的基础上累加
						db.find("carList",{userID:data1.userID,goodsID:data1.goodsID},(err,item)=>{
							item = item[0];
							item.num = item.num*1+data1.num*1;
							db.updateOne("carList",{userID:data1.userID,goodsID:data1.goodsID},{
								num:item.num
							},(err,resulte)=>{
								res.send({
									status:"1",
									statusText:"ok"
								})
							})
						})
					}else{
						//未购买    插入新数据
						db.insertOne("carList",{
							userID:data1.userID,
							goodsID:data1.goodsID,
							num:data1.num
						},(err,result)=>{
							res.send({
								status:"1",
								statusText:"ok"
							})
						})
					}
				})
				
				
			}else{
				res.status(401)
				res.send()
			}
		}
	})
})

http.get("/car",(req,res)=>{
	let data1 = req.query;
	jwt.setToken(data1.tokenID,(err,data2)=>{
		if(err){
			res.status(401)
			res.send()
		}else{
			if(data1.userID == data2.id){
				db.find("carList",{
					query:{userID:data1.userID}
				},(err,carRes)=>{
					if(carRes.length == 0 ){
						res.send({
							status:"2",
							statusText:"购物车空空如也"
						})
					}else{
						console.log(carRes);
						let arr = carRes.map((item,index)=>{
							return new Promise((resolve,reject)=>{
								db.findById("goodsList",item.goodsID,(err,value)=>{
									if(err){
										reject(err)
									}else{
										resolve(value)
									}
								})
							})
						})
						Promise.all(arr).then(msg=>{
							let sum = 0;
							let list = msg.map((item,index)=>{
								item._id = carRes[index]._id;
								item.goodsnum = carRes[index].num;
								sum += item.goods_price*item.goodsnum;
								return item
							})
							res.send({
								status:"1",
								statusText:"ok",
								data:{
									list,
									sum
								}
							})
						})
					}
				})
				
				
			}else{
				res.status(401)
				res.send()
			}
		}
	})
})

http.get("/lx",function(req,res){
	let obj = req.query;
	{
		userID:,
		list:[{
			goodsID,
			goodsNum:
		}]
	}
	
})
