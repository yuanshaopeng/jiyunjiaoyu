const md5 = require("js-md5");
const dbPlugin = require("./db.js");
const jwt = require("./jwt.js");
const db = new dbPlugin("bBox");
module.exports = {
	_login(req,res){
		db.find("adminList",{query:{adminname:req.body.adminname,adminpass:req.body.adminpass}},(err,data)=>{
			if(data.length > 0){
				let admin = data[0];
				db.insertOne("adminLog",{
					adminname:admin.adminname,
					adminID:admin._id,
					content:"登陆了"+admin.adminname+"管理员",
					time:new Date().getTime()
				},(err,data2)=>{
					res.send({
						status:"1",
						statusText:"ok",
						data:{
							adminId:admin.amdin_id,
							adminname:admin.adminname,
							admin_tokenID:jwt.getToken({adminID:admin.amdin_id},"7d")
						}
					})
				})
			}else{
				res.status(400)
				res.send();
			}
		})
	}
}
